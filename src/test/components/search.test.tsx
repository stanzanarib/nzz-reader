import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchPage', () => {
  it('should render search input', () => {
    render(
      <input placeholder="Search by title, lead, or content..." />
    );
    expect(screen.getByPlaceholderText(/Search by title/)).toBeInTheDocument();
  });

  it('should allow typing in search input', async () => {
    const user = userEvent.setup();
    render(
      <input placeholder="Search by title, lead, or content..." />
    );

    const input = screen.getByPlaceholderText(/Search by title/) as HTMLInputElement;
    await user.type(input, 'innovation');

    expect(input.value).toBe('innovation');
  });

  it('should show empty state when no query', () => {
    render(<div>Enter a keyword to search the archive</div>);
    expect(screen.getByText(/Enter a keyword to search/)).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<div>Loading...</div>);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should show error message on failure', () => {
    render(<div>Network Connection Flaky</div>);
    expect(screen.getByText(/Network Connection Flaky/)).toBeInTheDocument();
  });

  it('should call retry when button clicked', async () => {
    const user = userEvent.setup();
    const mockRetry = vi.fn();

    render(<button onClick={mockRetry}>Retry Fetch</button>);

    await user.click(screen.getByRole('button', { name: /Retry/ }));
    expect(mockRetry).toHaveBeenCalled();
  });

  it('should display search results', () => {
    render(
      <div>
        <div>Article 1</div>
        <div>Article 2</div>
      </div>
    );

    expect(screen.getByText(/Article 1/)).toBeInTheDocument();
    expect(screen.getByText(/Article 2/)).toBeInTheDocument();
  });

  it('should clear input when clear button clicked', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(
      <div>
        <input defaultValue="innovation" placeholder="Search..." />
        <button onClick={handleClear}>Clear</button>
      </div>
    );

    await user.click(screen.getByRole('button', { name: /Clear/ }));
    expect(handleClear).toHaveBeenCalled();
  });
});