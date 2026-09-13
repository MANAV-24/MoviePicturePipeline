import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

test('renders empty state when no movie is selected', () => {
  render(<MovieDetails movie={null} />);

  expect(screen.getByText(/Pick a movie to see its spotlight/i)).toBeInTheDocument();
});

test('renders selected movie details', () => {
  render(<MovieDetails movie={{ id: '101', title: 'Midnight Signal' }} />);

  expect(screen.getByText('Midnight Signal')).toBeInTheDocument();
  expect(screen.getByText(/Movie ID 101/i)).toBeInTheDocument();
});
