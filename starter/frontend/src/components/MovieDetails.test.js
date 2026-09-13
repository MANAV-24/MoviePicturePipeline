// starter/frontend/src/components/MovieDetails.test.js
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

test('renders empty state when no movie is selected', () => {
  render(<MovieDetails movie={null} />);

  expect(screen.getByText(/Pick a movie to see its spotlight/i)).toBeInTheDocument();
});

test('renders selected movie details', () => {
  render(<MovieDetails movie={{ id: '101', title: 'Midnight Signal' }} />);

  expect(screen.getByRole('heading', { name: 'Midnight Signal', level: 3 }),).toBeInTheDocument();

  const spotlightCard = screen.getByText('Featured').closest('.spotlight-card');
  expect(spotlightCard).toHaveTextContent('Movie ID 101');
});
