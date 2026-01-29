import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!input.trim()) {
      alert("Please enter your movie preference");
      return;
    }

    setLoading(true);
    setMovies([]);

    try {
      const res = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      if (Array.isArray(data.movies)) {
        setMovies(data.movies);
      } else {
        alert("No recommendations found.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">Movie Recommendation App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="e.g. action movies with strong female lead"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={getRecommendations}>
          {loading ? "Finding..." : "Get Recommendations"}
        </button>
      </div>

      <div className="results">
        {movies.length > 0 && <h2>Recommended Movies</h2>}

        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div className="movie-card" key={index}>
              {movie}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
