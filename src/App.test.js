import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import App from './App';

test('renders learn react link', () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
