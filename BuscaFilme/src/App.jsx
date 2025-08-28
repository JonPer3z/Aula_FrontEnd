import React, { useState, useEffect } from "react";
import { fetchMoviesBySearchTerm } from "./Api";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieResults = await fetchMoviesBySearchTerm(searchTerm);
        setMovies(movieResults);
      } catch (e) {
        setError("Erro ao carregar os filmes:", e);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      const timer = setTimeout(() => {
        getMovies();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <h1>Buscador de Filmes</h1>
      <input
        type="text"
        placeholder="Digite o nome de um filme:"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p>Carregando filmes</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>Nenhum filme encontrado.</p>
      )}

      {!loading && movies.length > 0 && (
        <ul className="movie-list"></ul>
      )}
    </div>

  );
}

export default App;