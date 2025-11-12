import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard navigation', () => {
  render(<App />);
  expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /Top navigation/i })).toBeInTheDocument();
});
