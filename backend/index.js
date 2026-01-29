require("dotenv").config({ path: "./.env" });

const Fastify = require("fastify");
const cors = require("@fastify/cors");
const db = require("./db");
const Groq = require("groq-sdk");

const app = Fastify();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const start = async () => {
  try {
    await app.register(cors, { origin: true });

    app.post("/recommend", async (request, reply) => {
      const { input } = request.body;

      if (!input) {
        return reply.code(400).send({ error: "Input is required" });
      }

      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `
Suggest exactly 3 to 5 movies based on this preference:
"${input}"

Return ONLY a valid JSON array of movie names.
              `.trim(),
            },
          ],
          temperature: 0.7,
        });

        let movies;
        try {
          movies = JSON.parse(completion.choices[0].message.content);
        } catch {
          return reply
            .code(500)
            .send({ error: "Invalid AI response format" });
        }

        // ✅ SQLite insert (FIXED)
        db.prepare(
          "INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)"
        ).run(input, JSON.stringify(movies));

        return { movies };
      } catch (error) {
        console.error("Groq API error:", error);
        reply.code(500).send({ error: "Failed to generate recommendations" });
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
