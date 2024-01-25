import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecipeCard from '../Components/RecipeCard';

describe('RecipeCard component', () => {
  const mockRecipe = {
    name: 'Test Recipe',
    recipeOwnerName: 'Test Owner',
    image: 'test-image-url',
    ingredients: ['ingredient1', 'ingredient2'],
    instructions: 'Test instructions',
    difficulty: 'Easy',
    hearts: 5,
    comment: ['Comment 1', 'Comment 2'],
    additionalComment: 'Additional Comment',
  };

  it('renders without crashing', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
  });

  it('renders the recipe name and owner name', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('@Test Owner')).toBeInTheDocument();
  });

  it('renders the difficulty level', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('renders the hearts count', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders the comments count', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders the additional comment', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
    expect(screen.getByText('Additional Comment')).toBeInTheDocument();
  });

  it('flips the card when the flip button is clicked', () => {
    render(<RecipeCard recipe={mockRecipe} profile="no" />);
    const flipButton = screen.getByTestId('flip');
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();

    fireEvent.click(flipButton);

    expect(screen.getByText('Additional Comment')).toBeInTheDocument();
  });
});
