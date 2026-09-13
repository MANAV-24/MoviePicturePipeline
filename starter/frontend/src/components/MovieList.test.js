import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from './MovieList';

const movies = [
  { id: '101', title: 'Midnight Signal' },
  { id: '102', title: 'Paper Horizon' },
];

test('renders movie tiles and calls selection handler', () => {
  const onSelectMovie = jest.fn();

  render(<MovieList movies={movies} selectedMovieId="101" onSelectMovie={onSelectMovie} />);

  expect(screen.getByText('Midnight Signal')).toBeInTheDocument();
  expect(screen.getByText('Paper Horizon')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Paper Horizon'));
  expect(onSelectMovie).toHaveBeenCalledWith(movies[1]);
});