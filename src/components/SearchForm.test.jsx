import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    render(<SearchForm onSearch={mockOnSearch} />);
  });

  test('1. Renders all form fields correctly', () => {
    expect(screen.getByText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Postcode Area/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Beds/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Beds/i)).toBeInTheDocument();
    expect(screen.getByText(/From Date/i)).toBeInTheDocument();
    expect(screen.getByText(/To Date/i)).toBeInTheDocument();
  });

  test('2. Search button triggers onSearch with form data', () => {
    const postcodeInput = screen.getByPlaceholderText(/e.g., BR1/i);
    fireEvent.change(postcodeInput, { target: { value: 'BR1' } });
    
    const searchButton = screen.getByText(/Search Properties/i);
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('3. Reset button clears all form fields', () => {
    const postcodeInput = screen.getByPlaceholderText(/e.g., BR1/i);
    fireEvent.change(postcodeInput, { target: { value: 'BR1' } });
    
    const resetButton = screen.getByText(/Reset Filters/i);
    fireEvent.click(resetButton);
    
    expect(postcodeInput.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith({});
  });
});