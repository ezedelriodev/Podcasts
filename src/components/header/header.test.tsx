
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './header';


describe('Header component', () => {
    it('should render the text "Podcaster"', () => {
      render(<Header />);
      
      const headerElement = screen.getByText(/Podcaster/i);
      expect(headerElement).toBeInTheDocument();
    });
});
