function MovieList({ movies, selectedMovieId, onSelectMovie }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Movie shelf</h2>
        <span>{movies.length} results</span>
      </div>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p className="empty-state">No movies match that search.</p>
        ) : (
          movies.map((movie) => (
            <button
              key={movie.id}
              type="button"
              className={`movie-tile${selectedMovieId === movie.id ? ' active' : ''}`}
              onClick={() => onSelectMovie(movie)}
            >
              <strong>{movie.title}</strong>
              <span>Movie #{movie.id}</span>
            </button>
          ))
        )}
      </div>
    </section>
  );
}

export default MovieList;

