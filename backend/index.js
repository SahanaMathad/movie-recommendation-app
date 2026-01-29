require("dotenv").config({ path: "./.env" });

const Fastify = require("fastify");
const cors = require("@fastify/cors");
const db = require("./db");
const OpenAI = require("openai");

const app = Fastify();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const start = async () => {
  try {
    await app.register(cors, { origin: true });

    app.post("/recommend", async (request, reply) => {
      const { input } = request.body;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Suggest 3 to 5 movies based on this preference: "${input}". 
              Return only movie names separated by commas.`
            }
          ]
        });

        // Convert string → array
        const moviesText = completion.choices[0].message.content;
        const movies = moviesText
          .split(",")
          .map(m => m.trim())
          .filter(Boolean);

        // Save to DB
        db.prepare(
          "INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)"
        ).run(input, JSON.stringify(movies));

        return { movies };

      } catch (error) {
        console.error(error);
        reply.code(500).send({ error: "AI failed" });
      }
    });

    await app.listen({ port: 5000, host: "0.0.0.0" });
    console.log("✅ Backend running on port 5000");

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
