# Movie Recommendation Web App

A web application that recommends movies based on a user’s input using the GROQ API. Users can provide their movie preferences and receive 3–5 relevant movie suggestions.

## Objective
Build a full-stack web application that allows users to discover movies tailored to their interests.

## Features

### Frontend (React)
- Form to enter a genre or short description of preferred movies (for example, "action movies with a strong female lead").
- Display 3–5 movie recommendations returned from the backend.

### Backend (Node.js + Fastify)
- Accepts POST requests with user input.
- Uses the GROQ API to generate movie recommendations.
- Returns the movie list as a JSON response.

### Database (SQLite)
- Stores user inputs along with the recommendations.
- Schema example:
  | Column               | Type       |
  |----------------------|------------|
  | id                   | INTEGER PK |
  | user_input           | TEXT       |
  | recommended_movies   | TEXT/JSON  |
  | timestamp            | DATETIME   |

## Tech Stack
- Frontend: React
- Backend: Node.js, Fastify
- Database: SQLite
- AI API: GROQ API

## Installation / Running Locally

1. Clone the repository

```bash
git clone https://github.com/SahanaMathad/movie-recommendation-app.git
cd movie-recommendation-app
```

2. Install dependencies

- Backend:

```bash
cd backend
npm install
```

- Frontend:

```bash
cd ../frontend
npm install
```

3. Create a `.env` file in the backend folder

```
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the backend server

```bash
cd backend
npm start
```

5. Run the frontend application

```bash
cd frontend
npm start
```

6. Open the application in the browser at `http://localhost:3000`

## API Endpoint

- POST `/recommend`
  - Request body: `{ "user_input": "action movies with a strong female lead" }`
  - Response:
    ```json
    {
      "recommended_movies": [
        "Mad Max: Fury Road",
        "Wonder Woman",
        "Atomic Blonde"
      ]
    }
    ```

## Deployed Link
[View Live Application](https://your-deployed-link.com)
*(Replace with the actual deployment link)*

## Repository
[GitHub Repository](https://github.com/SahanaMathad/movie-recommendation-app)

## Notes
- `node_modules/` and `.env` are ignored via `.gitignore`.
- Ensure the GROQ API key is valid and set in `.env`.
- User queries along with recommendations are saved in SQLite.

## Future Improvements
- Add user authentication to save personalized history.
- Enhance UI/UX with movie posters and ratings.
- Include pagination for larger recommendation sets.

