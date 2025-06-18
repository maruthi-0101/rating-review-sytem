import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '/Users/maruthisundar/Documents/intership projects/ratings-frontend/src/loginpage.jsx';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
