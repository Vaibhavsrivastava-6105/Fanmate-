import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AssistantPage from '../app/assistant/page';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ reply: "This is a mock AI response." }),
  })
) as jest.Mock;

describe('AssistantPage Component', () => {
  it('renders the chat interface', () => {
    render(<AssistantPage />);
    expect(screen.getByText(/FAN MATE AI Assistant/i)).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText(/Ask anything about the stadium.../i);
    const sendButton = screen.getByLabelText(/Send message to AI/i);

    fireEvent.change(input, { target: { value: 'Where is the food?' } });
    expect(input).toHaveValue('Where is the food?');
    
    fireEvent.click(sendButton);
    
    // Expect user message to be added to UI
    expect(screen.getByText('Where is the food?')).toBeInTheDocument();
    
    // Expect AI response to appear
    await waitFor(() => {
      expect(screen.getByText('This is a mock AI response.')).toBeInTheDocument();
    });
  });
});
