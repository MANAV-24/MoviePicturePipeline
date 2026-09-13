// starter/frontend/src/App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          movies: [
            { id: '101', title: 'Midnight Signal' },
            { id: '102', title: 'Paper Horizon' },
            { id: '103', title: 'The Last Frame' },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the movie shelf header', async () => {
  render(<App />);

  expect(screen.getByText(/MoviePicturePipeline/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /movie shelf/i, level: 2 })).toBeInTheDocument();
  });
});

test('loads movies from the API and shows the first movie spotlight', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'Midnight Signal', level: 3 })).toBeInTheDocument();
  });

  const spotlightCard = screen.getByText('Featured').closest('.spotlight-card');
  expect(spotlightCard).toHaveTextContent('Movie ID 101');
});
