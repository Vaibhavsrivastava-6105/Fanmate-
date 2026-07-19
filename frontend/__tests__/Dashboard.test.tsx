import { render, screen } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page';

// Mock fetch for dashboard tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      weather: { temp: "22°C", condition: "Sunny" },
      crowd: { level: 50, status: "Moderate" },
      countdown: { minutes: 30 }
    }),
  })
) as jest.Mock;

describe('Dashboard Component', () => {
  it('renders dashboard heading', async () => {
    render(<DashboardPage />);
    expect(await screen.findByText(/Live Dashboard/i)).toBeInTheDocument();
  });
});
