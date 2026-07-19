import { render, screen } from '@testing-library/react';
import MapPage from '../app/map/page';

jest.mock('../components/StadiumMap', () => () => <div data-testid="stadium-map-mock">Mocked Map</div>);

describe('MapPage Component', () => {
  it('renders the map page wrapper correctly', async () => {
    render(<MapPage />);
    expect(await screen.findByText(/Stadium Map/i)).toBeInTheDocument();
    expect(screen.getByTestId('stadium-map-mock')).toBeInTheDocument();
  });
});
