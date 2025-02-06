import React, { useState } from "react";
import RecipeChoices from "./RecipeChoices"; // ✅ Import RecipeChoices component

const BaristaForm = () => {
  // ✅ State to track user selections
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  // ✅ List of available choices for each ingredient
  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  const onNewDrink = () => {};
  const onCheckAnswer = () => {};

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>
      <form>
        {/* ✅ Add form sections for each ingredient */}
        {Object.keys(ingredients).map((category) => (
          <div key={category}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="answer-space">{inputs[category]}</div>
            <RecipeChoices
              handleChange={(e) =>
                setInputs((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              label={category}
              choices={ingredients[category]}
              checked={inputs[category]}
            />
          </div>
        ))}
      </form>

      <button type="submit" className="button submit" onClick={onCheckAnswer}>
        Check Answer
      </button>

      <button type="button" className="button newdrink" onClick={onNewDrink}>
        New Drink
      </button>
    </div>
  );
};

export default BaristaForm;
