import { render, screen } from '@testing-library/react';
import App from './App';

test('renders QR Code Genie title', () => {
  render(<App />);
  const titleElement = screen.getByText(/QR Code Genie/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders input textarea', () => {
  render(<App />);
  const textareaElement = screen.getByPlaceholderText(/Enter text, URL, or any content/i);
  expect(textareaElement).toBeInTheDocument();
});

test('renders theme toggle button', () => {
  render(<App />);
  const themeButton = screen.getByText(/Switch to Dark Mode/i);
  expect(themeButton).toBeInTheDocument();
});
