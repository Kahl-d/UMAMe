import React from "react";
import './CSS/inGrid.css';

const InGrid = (props) => {
  const { ingredients } = props;

  return (
    <div className="in-grid">
      <h2 className="inTitle">Ingredients:</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InGrid;
