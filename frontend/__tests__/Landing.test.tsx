import { render, screen } from '@testing-library/react';
import LandingPage from '../app/page';

// Mock components that use intersection observers or complex hooks
jest.mock('../components/HeroAnimation', () => () => <div data-testid="hero-animation">Hero Mock</div>);

describe('LandingPage Component', () => {
  it('renders the landing page features', async () => {
    render(<LandingPage />);
    expect(await screen.findByTestId('hero-animation')).toBeInTheDocument();
    // Check for a ticker item
    expect((await screen.findAllByText(/Kickoff in 18 Minutes/i))[0]).toBeInTheDocument();
  });
});
