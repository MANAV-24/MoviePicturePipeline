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
    }),
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the movie shelf header', async () => {
  render(<App />);

  expect(screen.getByText(/MoviePicturePipeline/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Movie shelf/i)).toBeInTheDocument();
  });
});

test('loads movies from the API and shows the first movie spotlight', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Midnight Signal')).toBeInTheDocument();
  });

  expect(screen.getByText(/Movie ID 101/i)).toBeInTheDocument();
});