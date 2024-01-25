import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import LandingPage from '../Components/LandingPage';
import { BrowserRouter } from 'react-router-dom';

test('LandingPage component renders correctly', () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
  const welcomeText = screen.getByText('Welcome');
  const nameInput = screen.getByPlaceholderText('Enter Name ...');
  const loginButton = screen.getByTestId('buttonLogin');
  const asGuestButton = screen.getByTestId('asguest');

  expect(welcomeText).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(asGuestButton).toBeInTheDocument();
});

test('asGuest button navigates to /main', () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );

  const asGuestButton = screen.getByTestId('asguest');
  userEvent.click(asGuestButton);
  expect(window.location.pathname).toBe('/main');
});
