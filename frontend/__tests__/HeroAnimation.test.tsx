import { render, screen } from '@testing-library/react';
import HeroAnimation from '../components/HeroAnimation';

describe('HeroAnimation Component', () => {
  it('renders without crashing', () => {
    render(<HeroAnimation />);
    expect(screen.getByAltText(/World Cup Player Kicking/i)).toBeInTheDocument();
  });
});
