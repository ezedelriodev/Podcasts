import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EpisodeDetail from './episode-detail';



describe('EpisodeDetail component', () => {
    it('should render the text "EpisodeDetail"', () => {
      render(<EpisodeDetail />);
      
      const headerElement = screen.getByText(/EpisodeDetail/i);
      expect(headerElement).toBeInTheDocument();
    });
});