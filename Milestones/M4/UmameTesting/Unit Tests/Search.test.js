import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from '../Components/Search';

jest.mock('axios', () => ({
  post: jest.fn((url) => {
    if (url === "http://3.14.254.41/search") {
      return Promise.resolve({
        data: {
          recipes: [
            { id: 1, name: "Pizza" },
            { id: 2, name: "Pasta" }
          ]
        }
      });
    }
  })
}));

test('Search form submission with valid search term', async () => {
  render(<Search />);
  const searchBarTextField = screen.getByPlaceholderText('What do you want to eat today?');
  const srcButton = screen.getByTestId('srcBtn');

  fireEvent.change(searchBarTextField, { target: { value: 'Pasta' } });
  fireEvent.click(srcButton);

  waitFor(() => {
    const recipe1 = screen.getByText((content, element) => content === 'Pizza');
    const recipe2 = screen.getByText((content, element) => content === 'Pasta');
    expect(recipe1).toBeInTheDocument(); 
    expect(recipe2).toBeInTheDocument(); 
  });
});
