function MovieDetails({ movie }) {
  return (
    <section className="panel spotlight">
      <div className="panel-header">
        <h2>Spotlight</h2>
        <span>Selected title</span>
      </div>

      {!movie ? (
        <div className="empty-state">Pick a movie to see its spotlight.</div>
      ) : (
        <article className="spotlight-card">
          <div className="spotlight-badge">Featured</div>
          <h3>{movie.title}</h3>
          <p>
            Movie ID <strong>{movie.id}</strong>
          </p>
          <p className="spotlight-note">
            A clean, custom movie shelf with search, selection, and a featured card layout.
          </p>
        </article>
      )}
    </section>
  );
}

export default MovieDetails;

