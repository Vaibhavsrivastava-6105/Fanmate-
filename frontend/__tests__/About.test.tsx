import { render, screen } from '@testing-library/react';
import AboutPage from '../app/about/page';

describe('AboutPage Component', () => {
  it('renders the about page header', () => {
    render(<AboutPage />);
    expect(screen.getByText(/About FAN MATE AI/i)).toBeInTheDocument();
  });

  it('renders feature items', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Core Features/i)).toBeInTheDocument();
  });
});
