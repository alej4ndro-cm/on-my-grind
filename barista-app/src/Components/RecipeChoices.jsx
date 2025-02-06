import React from "react";

const RecipeChoices = ({ handleChange, label, choices, checked }) => {
    return (
      <div className="radio-buttons">
        {/* Add text input at the top */}
        <input
          type="text"
          name={label}
          value={checked}
          placeholder="Guess the ingredient..."
          onChange={handleChange}
          className="textbox"
        />
        
        {/* List choices below */}
        {choices &&
          choices.map((choice) => (
            <li key={choice}>
              {choice}
            </li>
        ))}
      </div>
    );
};

export default RecipeChoices;