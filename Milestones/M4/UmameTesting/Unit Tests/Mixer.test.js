import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Mixer from '../Components/Mixer';

describe('Mixer Component', () => {
  it('adds an ingredient to the list', () => {
    render(<Mixer />);

    const ingredientName = 'Test Ingredient';

    const inputField = screen.getByPlaceholderText(/Search for a recipe.../i);

    fireEvent.change(inputField, { target: { value: ingredientName } });

    const addButton = screen.getByTestId('addIngredientButton');
    fireEvent.click(addButton);

  });

  it('handles search click and displays search results', async () => {
    render(<Mixer />);

    const mixButton = screen.getByTestId('mixButton');
    fireEvent.click(mixButton);

    await waitFor(() => {
      const searchResults = screen.queryByTestId('mixerResults');
      expect(searchResults).toBeInTheDocument
    });

  });

  
});
