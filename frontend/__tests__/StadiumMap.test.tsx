import { render, screen } from '@testing-library/react';
import StadiumMap from '../components/StadiumMap';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, type: "Seat", name: "Section 214", lat: 40.7128, lng: -74.0060, crowd: "Low" }
    ]),
  })
) as jest.Mock;

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }: any) => <div>{children}</div>,
  Popup: ({ children }: any) => <div>{children}</div>,
  useMap: () => ({}),
}));

jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
}));

describe('StadiumMap Component', () => {
  it('renders the map container without crashing', () => {
    // Next.js dynamic import is typically used for leafet, but we mock the component rendering
    render(<StadiumMap />);
    // The MapContainer won't render its children without a window properly in jsdom, but it renders a div
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });
});
