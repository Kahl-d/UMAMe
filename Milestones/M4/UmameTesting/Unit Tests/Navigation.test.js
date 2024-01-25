import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Navigation from '../Components/Navigation';
import { BrowserRouter } from 'react-router-dom';

test('Navigation component renders correctly', () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  const homeButton = screen.getByText('Home');
  const searchButton = screen.getByText('Search');
  const mixerButton = screen.getByText('Mixer');
  const addButton = screen.getByText('Add');

  expect(homeButton).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(mixerButton).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('Navigation buttons navigate to the correct paths', () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );

  const homeButton = screen.getByText('Home');
  const searchButton = screen.getByText('Search');
  const mixerButton = screen.getByText('Mixer');
  const addButton = screen.getByText('Add');

  userEvent.click(homeButton);
  expect(window.location.pathname).toBe('/main');

  userEvent.click(searchButton);
  expect(window.location.pathname).toBe('/search');

  userEvent.click(mixerButton);
  expect(window.location.pathname).toBe('/mixer');

  userEvent.click(addButton);
  expect(window.location.pathname).toBe('/add');
});
