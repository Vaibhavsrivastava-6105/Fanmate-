import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders the branding text correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('FAN MATE AI')).toBeInTheDocument();
  });
});
