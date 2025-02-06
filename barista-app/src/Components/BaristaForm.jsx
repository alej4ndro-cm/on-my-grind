const onCheckAnswer = () => {
  // Validate temperature
  if (!ingredients['temperature'].includes(inputs['temperature'])) {
    alert("For temperature, that isn't even an option!");
    return;
  }
  
  // Validate syrup
  if (!ingredients['syrup'].includes(inputs['syrup'])) {
    alert("For syrup, that isn't even an option!");
    return;
  }
  
  // Validate milk
  if (!ingredients['milk'].includes(inputs['milk'])) {
    alert("For milk, that isn't even an option!");
    return;
  }
  
  // Validate blended
  if (!ingredients['blended'].includes(inputs['blended'])) {
    alert("For blended, that isn't even an option!");
    return;
  }

  // If all inputs are valid, check if they're correct
  if (trueRecipe.temperature != inputs['temperature']){
    setCheckedTemperature('wrong');
  } else {
    setCheckedTemperature('correct');
  }
  
  if (trueRecipe.syrup != inputs['syrup']){
    setCheckedSyrup('wrong');
  } else {
    setCheckedSyrup('correct');
  }
  
  if (trueRecipe.milk != inputs['milk']){
    setCheckedMilk('wrong');
  } else {
    setCheckedMilk('correct');
  }
  
  if (trueRecipe.blended != inputs['blended']){
    setCheckedBlended('wrong');
  } else {
    setCheckedBlended('correct');
  }
}