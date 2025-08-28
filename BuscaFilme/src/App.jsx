import React, { useState, useEffect } from "react";
import { fetchMoviesBySearchTerm } from "./Api";
import "./App.css";

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
      } catch (err) {
        setError(
          "Não foi possível carregar os filmes. Verifique sua conexão e chave de API.", err
        );
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
        placeholder="Digite o nome de um filme..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p>Carregando filmes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && movies.length === 0 && searchTerm !== "" && (
        <p>Nenhum filme encontrado. Tente novamente.</p>
      )}

      {!loading && movies.length > 0 && (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>Nota: {movie.vote_average}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
