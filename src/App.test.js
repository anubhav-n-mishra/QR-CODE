import { render, screen } from '@testing-library/react';
import App from './App';

test('renders QR Code Explainer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/QR Code Explainer/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders input textarea', () => {
  render(<App />);
  const textareaElement = screen.getByPlaceholderText(/Enter text, URL, or any content/i);
  expect(textareaElement).toBeInTheDocument();
});

test('renders theme toggle button', () => {
  render(<App />);
  const themeButton = screen.getByText(/Dark Mode/i);
  expect(themeButton).toBeInTheDocument();
});
