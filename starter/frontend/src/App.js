import { useEffect, useMemo, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

const API_URL = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadMovies() {
      try {
        const response = await fetch(`${API_URL}/movies`);

        if (!response.ok) {
          throw new Error('Movie request failed');
        }

        const payload = await response.json();
        const list = payload.movies || [];

        if (!mounted) {
          return;
        }

        setMovies(list);
        setSelectedMovie(list[0] || null);
        setStatus('ready');
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError('Unable to load the movie shelf right now.');
        setStatus('error');
      }
    }

    loadMovies();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredMovies = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return movies;
    }

    return movies.filter((movie) => movie.title.toLowerCase().includes(query));
  }, [movies, searchTerm]);

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">MoviePicturePipeline</p>
        <h1>Build your watchlist around what feels right.</h1>
        <p className="hero-copy">
          Browse the latest movie shelf, search by title, and open a film card for a quick spotlight.
        </p>

        <label className="search-box" htmlFor="movie-search">
          <span>Search titles</span>
          <input
            id="movie-search"
            type="text"
            placeholder="Try Maverick, Sonic, or Quiet..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="hero-meta">
          <span>{movies.length} total titles</span>
          <span>{filteredMovies.length} visible now</span>
        </div>
      </section>

      {status === 'loading' && <p className="state-message">Loading movie shelf...</p>}
      {status === 'error' && <p className="state-message error">{error}</p>}

      {status === 'ready' && (
        <section className="content-grid">
          <MovieList
            movies={filteredMovies}
            selectedMovieId={selectedMovie ? selectedMovie.id : null}
            onSelectMovie={setSelectedMovie}
          />
          <MovieDetails movie={selectedMovie} />
        </section>
      )}
    </main>
  );
}

export default App;