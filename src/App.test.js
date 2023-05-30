import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom';
import App from './App';

test('renders learn react link', () => {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    if (container) {
      const root = createRoot(container);
      root.render(<App />);
      const linkElement = screen.getByText(/learn react/i);
      expect(linkElement).toBeInTheDocument();
      }
  })
  })

