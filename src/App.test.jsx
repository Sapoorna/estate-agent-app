import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import properties from './data/properties.json';

// Mock data for testing
const mockProperties = properties;

describe('Estate Agent App', () => {
  test('1. Renders app title correctly', () => {
    render(<App />);
    const titleElement = screen.getByText(/🏠 RightMove Clone/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('2. Displays all properties on initial load', () => {
    render(<App />);
    const propertyCards = screen.getAllByText(/£/i);
    expect(propertyCards.length).toBeGreaterThanOrEqual(mockProperties.length);
  });

  test('3. Search form renders with all fields', () => {
    render(<App />);
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g., BR1/i)).toBeInTheDocument();
    expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
  });

  test('4. Favourites list is initially empty', () => {
    render(<App />);
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });

  test('5. Property card displays correct information', () => {
    render(<App />);
    const firstProperty = mockProperties[0];
    expect(screen.getByText(new RegExp(`£${firstProperty.price.toLocaleString()}`))).toBeInTheDocument();
    expect(screen.getByText(firstProperty.shortDescription)).toBeInDocument();
  });
});