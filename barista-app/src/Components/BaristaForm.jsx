import React, { useState, useEffect } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "../drinks.json";

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState({});

  const [correct_temp, setCheckedTemperature] = useState("");
  const [correct_syrup, setCheckedSyrup] = useState("");
  const [correct_milk, setCheckedMilk] = useState("");
  const [correct_blended, setCheckedBlended] = useState("");
  
  // Notification state
  const [notification, setNotification] = useState({ message: "", visible: false });

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    let timer;
    if (notification.visible) {
      timer = setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [notification.visible]);

  // Function to show notification
  const showNotification = (message) => {
    setNotification({ message, visible: true });
  };

  // Function to hide notification
  const hideNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  const getNextDrink = () => {
    // Make sure we have drink data
    if (!drinksJson || !drinksJson.drinks || drinksJson.drinks.length === 0) {
      console.error("No drinks found in drinks.json");
      showNotification("Error loading drinks. Please refresh.");
      return;
    }
    
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    const drink = drinksJson.drinks[randomDrinkIndex];
    
    setCurrentDrink(drink.name);
    setTrueRecipe(drink.ingredients);
    
    // Debug
    console.log("Selected drink:", drink.name);
    console.log("True recipe:", drink.ingredients);
  };

  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });

    setCheckedTemperature("");
    setCheckedSyrup("");
    setCheckedMilk("");
    setCheckedBlended("");

    getNextDrink();
  };

  // Check if an input value is valid (exists in the allowed ingredients)
  const isValidSelection = (category, value) => {
    return ingredients[category].includes(value.toLowerCase().trim());
  };

  const onCheckAnswer = () => {
    // First, check if we have a current drink selected
    if (!currentDrink) {
      showNotification("Please select a drink first by clicking 🔄");
      return;
    }
    
    // Next, check if we have a true recipe to compare against
    if (!trueRecipe || Object.keys(trueRecipe).length === 0) {
      showNotification("Error: No recipe found for the current drink");
      console.error("No true recipe available for:", currentDrink);
      return;
    }

    // Define the correct order of categories to check
    const categories = ["temperature", "syrup", "milk", "blended"];
    
    // Check each category in order for emptiness AND validity
    for (let category of categories) {
      const input = inputs[category].trim();
      
      // Check if empty first
      if (!input) {
        showNotification(`Please make a selection for ${category}.`);
        return;
      }
      
      // Then check if the selection is valid
      if (!isValidSelection(category, input)) {
        showNotification(`"${input}" is not a valid ${category} option.`);
        return;
      }
    }
    
    // Now compare answers to the true recipe (case insensitive)
    const tempCorrect = trueRecipe.temperature?.toLowerCase() === inputs.temperature.toLowerCase().trim();
    const syrupCorrect = trueRecipe.syrup?.toLowerCase() === inputs.syrup.toLowerCase().trim();
    const milkCorrect = trueRecipe.milk?.toLowerCase() === inputs.milk.toLowerCase().trim();
    const blendedCorrect = trueRecipe.blended?.toLowerCase() === inputs.blended.toLowerCase().trim();
    
    // Update the visual indicators
    setCheckedTemperature(tempCorrect ? "correct" : "wrong");
    setCheckedSyrup(syrupCorrect ? "correct" : "wrong");
    setCheckedMilk(milkCorrect ? "correct" : "wrong");
    setCheckedBlended(blendedCorrect ? "correct" : "wrong");
    
    // Check if any selections are wrong and provide feedback
    const incorrectSelections = [];
    if (!tempCorrect) incorrectSelections.push("temperature");
    if (!syrupCorrect) incorrectSelections.push("syrup");
    if (!milkCorrect) incorrectSelections.push("milk");
    if (!blendedCorrect) incorrectSelections.push("blended");
    
    if (incorrectSelections.length > 0) {
      showNotification(`Incorrect: ${incorrectSelections.join(", ")}. Try again!`);
    } else {
      showNotification("Correct! All selections match!");
    }
  };

  // Initial load of a drink when component mounts
  useEffect(() => {
    if (!currentDrink) {
      getNextDrink();
    }
  }, []);

  return (
    <div>
      {/* Notification component */}
      {notification.visible && (
        <div
          onClick={hideNotification}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(51, 51, 51, 0.9)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            fontSize: '14px',
            pointerEvents: 'auto', // This ensures the click works
          }}
        >
          {notification.message}
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>×</span>
        </div>
      )}

      <h2>Hi, I'd like to order a:</h2>
      <div className="drink-container">
        <h2 className="mini-header">
          {currentDrink ? currentDrink : <span><b>Click</b> 🔄 <b>to get a drink</b></span>}
        </h2>
        <button
          type="new-drink-button"
          className="button newdrink"
          onClick={onNewDrink}
        >
          🔄
        </button>
      </div>

      <form className="container">
        <div className="mini-container">
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
            value={inputs["temperature"]}
          />
        </div>

        <div className="mini-container">
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
            value={inputs["syrup"]}
          />
        </div>

        <div className="mini-container">
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
            value={inputs["milk"]}
          />
        </div>

        <div className="mini-container">
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
            value={inputs["blended"]}
          />
        </div>
      </form>

      <div className="button-container">
        <button type="button" className="button submit" onClick={onCheckAnswer}>
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