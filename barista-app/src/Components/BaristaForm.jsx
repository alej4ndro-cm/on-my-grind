import React, { useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "../drinks.json"; 

const BaristaForm = () => {
  // State for user inputs
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  // State for correctness indicators
  const [correct_temp, setCheckedTemperature] = useState("");
  const [correct_syrup, setCheckedSyrup] = useState("");
  const [correct_milk, setCheckedMilk] = useState("");
  const [correct_blended, setCheckedBlended] = useState("");

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

    // Reset correctness indicators
    setCheckedTemperature("");
    setCheckedSyrup("");
    setCheckedMilk("");
    setCheckedBlended("");

    getNextDrink();
  };

  // Check answers and update correctness states
  const onCheckAnswer = () => {
    setCheckedTemperature(
      trueRecipe.temperature !== inputs["temperature"] ? "wrong" : "correct"
    );
    setCheckedSyrup(
      trueRecipe.syrup !== inputs["syrup"] ? "wrong" : "correct"
    );
    setCheckedMilk(
      trueRecipe.milk !== inputs["milk"] ? "wrong" : "correct"
    );
    setCheckedBlended(
      trueRecipe.blended !== inputs["blended"] ? "wrong" : "correct"
    );
  };

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>

      {/* Display the current drink */}
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink || "Click 🔄 to get a drink"}</h2>
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
        <h3>Temperature</h3>
        <div className="answer-space" id={correct_temp}>
          {inputs["temperature"]}
        </div>
        <RecipeChoices
          handleChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
          label="temperature"
          choices={ingredients["temperature"]}
          checked={inputs["temperature"]}
        />

        <h3>Syrup</h3>
        <div className="answer-space" id={correct_syrup}>
          {inputs["syrup"]}
        </div>
        <RecipeChoices
          handleChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
          label="syrup"
          choices={ingredients["syrup"]}
          checked={inputs["syrup"]}
        />

        <h3>Milk</h3>
        <div className="answer-space" id={correct_milk}>
          {inputs["milk"]}
        </div>
        <RecipeChoices
          handleChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
          label="milk"
          choices={ingredients["milk"]}
          checked={inputs["milk"]}
        />

        <h3>Blended</h3>
        <div className="answer-space" id={correct_blended}>
          {inputs["blended"]}
        </div>
        <RecipeChoices
          handleChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
          label="blended"
          choices={ingredients["blended"]}
          checked={inputs["blended"]}
        />
      </form>

      {/* Buttons */}
      <div className="button-container">
        <button type="submit" className="button submit" onClick={onCheckAnswer}>
          Check Answer
        </button>

        <button type="button" className="button newdrink" onClick={onNewDrink}>
          New Drink
        </button>
      </div>
    </div>
  );
};

export default BaristaForm;