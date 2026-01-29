import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Set this in Vercel Environment Variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { input } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    // Call Groq API for movie recommendations
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Suggest exactly 3 to 5 movies based on this preference:
"${input}"

Return ONLY a valid JSON array of movie names.`,
        },
      ],
      temperature: 0.7,
    });

    let movies;

    try {
      // Parse AI response to JSON array
      movies = JSON.parse(completion.choices[0].message.content);
    } catch {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    return res.status(200).json({ movies });
  } catch (error) {
    console.error("Groq API error:", error);
    return res.status(500).json({ error: "Failed to generate recommendations" });
  }
}
