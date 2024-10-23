import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './home';




describe('Home component', () => {
    it('should render the text "Home"', () => {
      render(<Home />);
      
      const headerElement = screen.getByText(/Home/i);
      expect(headerElement).toBeInTheDocument();
    });
});