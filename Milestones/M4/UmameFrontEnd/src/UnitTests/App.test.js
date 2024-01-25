import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Main from './Components/Main';
import Add from './Components/Add';
import Search from './Components/Search';
import Mixer from './Components/Mixer';
import LandingPage from './Components/LandingPage';

// Mock the react-router-dom useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('App component', () => {
  // Helper function to render App with a specific path
  const renderWithRouter = (path) => {
    jest.clearAllMocks();
    // Mock the pathname based on the provided path
    useLocation.mockReturnValueOnce({ pathname: path });

    return render(
      <Router>
        <App />
      </Router>
    );
  };

  test('renders App component with LandingPage by default', () => {
    renderWithRouter('/');

    // Assertions for the LandingPage content
    expect(screen.getByText('Landing Page Content')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('navigates to Main component', async () => {
    renderWithRouter('/main');

    // Assertions for the Main component content
    expect(screen.getByText('Main Component Content')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('navigates to Add component', async () => {
    renderWithRouter('/add');

    // Assertions for the Add component content
    expect(screen.getByText('Add Component Content')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('navigates to Search component', async () => {
    renderWithRouter('/search');

    // Assertions for the Search component content
    expect(screen.getByText('Search Component Content')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('navigates to Mixer component', async () => {
    renderWithRouter('/mixer');

    // Assertions for the Mixer component content
    expect(screen.getByText('Mixer Component Content')).toBeInTheDocument();
    // Add more assertions as needed
  });

  // Add more tests to cover different scenarios and edge cases

  // Example of testing component lifecycle (useEffect)
  test('handles location change and removes event listener on unmount', () => {
    const { unmount } = renderWithRouter('/');
    
    // Add assertions related to useEffect logic

    // Simulate unmount
    unmount();

    // Assertions to ensure the event listener is removed
    expect(window.removeEventListener).toHaveBeenCalledWith('popstate', expect.any(Function));
  });

  // Add more tests to cover different scenarios and edge cases
});
