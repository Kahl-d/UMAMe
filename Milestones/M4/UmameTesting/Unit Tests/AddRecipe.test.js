import React from 'react';
import { render, fireEvent, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddRecipe from '../Components/AddRecipe';

test('renders AddRecipe component', () => {
  const { getByText } = render(<AddRecipe />);
  expect(getByText('Add Recipe')).toBeInTheDocument();
});

test('clicking "Next" button increments the active step', () => {
  const { getByTestId } = render(<AddRecipe />);
  fireEvent.click(getByTestId('buttonNext'));
  expect(getByTestId('stepIngredients')).toBeInTheDocument();
});

test('clicking "Back" button decrements the active step', () => {
  const { getByTestId } = render(<AddRecipe />);
  fireEvent.click(getByTestId('buttonNext'));
  fireEvent.click(getByTestId('buttonBack'));
  expect(getByTestId('stepName')).toBeInTheDocument();
});

test('submitting the form logs the recipe data', () => {
  console.log = jest.fn();

  const { getByLabelText, getByTestId, getByText } = render(<AddRecipe />);
  const recipeNameInput = getByLabelText('Recipe Name');
  fireEvent.change(recipeNameInput, { target: { value: 'My Recipe' } });

  fireEvent.click(getByTestId('buttonNext'));
  fireEvent.click(getByTestId('buttonNext'));
  fireEvent.click(getByTestId('buttonNext'));

  fireEvent.click(getByText('Submit'));

  expect(console.log).toHaveBeenCalledWith('Submitting recipe:', {
    name: 'My Recipe',
    ingredients: [],
    instructions: [],
    additionalComment: '',
    difficulty: '',
    tags: '',
    image: null,
  });
});

test('adding and deleting ingredients', () => {
  const { getByTestId, queryByTestId } = render(<AddRecipe />);
  
  // Navigate to the "Ingredients" step
  fireEvent.click(getByTestId('buttonNext'));
  expect(getByTestId('stepIngredients')).toBeInTheDocument();

  // Add an ingredient
  fireEvent.click(getByTestId('add-ingredients'));
  expect(getByTestId('ingredient-item-0')).toBeInTheDocument();

  // Delete the added ingredient
  fireEvent.click(getByTestId('delete-ingredient-0'));
  expect(queryByTestId('ingredient-item-0')).toBeNull();
});

test('adding and deleting instructions', () => {
  const { getByTestId, queryByTestId } = render(<AddRecipe />);
  
  // Navigate to the "Instructions" step
  fireEvent.click(getByTestId('buttonNext'));
  fireEvent.click(getByTestId('buttonNext'));
  expect(getByTestId('stepInstructions')).toBeInTheDocument();

  // Add an instruction
  fireEvent.click(getByTestId('add-instructions'));
  expect(getByTestId('instruction-item-0')).toBeInTheDocument();

  // Delete the added instruction
  fireEvent.click(getByTestId('delete-instruction-0'));
  expect(queryByTestId('instruction-item-0')).toBeNull();
});
