import React, { useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "../drinks.json"; // Import drinks.json

const BaristaForm = () => {
  // State for user inputs
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  // State for current drink
  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState({});

  // List of ingredient choices
  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  // Function to get a random drink
  const getNextDrink = () => {
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    let selectedDrink = drinksJson.drinks[randomDrinkIndex];

    setCurrentDrink(selectedDrink.name);
    setTrueRecipe(selectedDrink.ingredients);
  };

  // Reset inputs and fetch a new drink
  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });

    getNextDrink();
  };

  const onCheckAnswer = () => {};

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>

      {/* Display the current drink */}
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button
            type="new-drink-button"
            className="button newdrink"
            onClick={onNewDrink}
        >
            🔄
        </button>
        </div>


      {/* Form for selecting ingredients */}
      <form>
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

      {/* Buttons */}
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
