import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PodcastDetail from './podcast-detail';




describe('PodcastDetail component', () => {
    it('should render the text "PodcastDetail"', () => {
      render(<PodcastDetail />);
      
      const headerElement = screen.getByText(/PodcastDetail/i);
      expect(headerElement).toBeInTheDocument();
    });
});