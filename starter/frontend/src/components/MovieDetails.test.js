import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

test('renders empty state when no movie is selected', () => {
  render(<MovieDetails movie={null} />);

  expect(screen.getByText(/Pick a movie to see its spotlight/i)).toBeInTheDocument();
});

test('renders selected movie details', () => {
  render(<MovieDetails movie={{ id: '101', title: 'Midnight Signal' }} />);

  expect(screen.getByRole('heading', { name: 'Midnight Signal', level: 3 })).toBeInTheDocument();
  expect(screen.getByText(/Movie ID 101/i)).toBeInTheDocument();
});
