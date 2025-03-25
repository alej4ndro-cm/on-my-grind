import React from "react";

const RecipeChoices = ({ handleChange, label, choices, value }) => {
  const handleClick = (choice) => {
    handleChange({ target: { name: label, value: choice } });
  };

  return (
    <div className="radio-buttons">
      <input
        type="text"
        placeholder="Guess the ingredient..."
        value={value}
        name={label}
        onChange={handleChange}
        className="input-box"
      />
      <ul>
        {choices.map((choice) => (
          <li key={choice} onClick={() => handleClick(choice)}>
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeChoices;
