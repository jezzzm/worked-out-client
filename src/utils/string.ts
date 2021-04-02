export const snakeToUpperFirst = (string: string): string => {
  const words = string.toLowerCase().split('_');

  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const snakeToLowercase = (string: string): string => string.toLowerCase().split('_').join(' ');


export const buildFrequencyString = (sets, reps) => {
  let frequency = '';

  if (sets?.min) {
    frequency += `${sets.min} x `;
  }

  frequency += reps.min;

  if (reps.max) {
    frequency += ` - ${reps.max}`;
  }

  if (reps.method) {
    frequency += ` ${snakeToLowercase(reps.method)}`;
  }

  return frequency;
};

export const buildMovementString = (movement, modifiers, effort) => {
  let movementString = '';

  if (modifiers?.equipment) {
    if (modifiers.equipment.style) {
      movementString += `${modifiers.equipment.style.map(style => snakeToUpperFirst(style)).join(' ')} `;
    }

    movementString += `${snakeToUpperFirst(modifiers.equipment.base)} `;
  }

  if (modifiers?.place) {
    if (modifiers.place?.orientation) {
      movementString += `${snakeToUpperFirst(modifiers.place.orientation)} `;
    } 
    movementString += `${snakeToUpperFirst(modifiers.place.base)} `;
    
  }
  
  movementString += `${movement} `;

  if (modifiers?.tempo) {
    movementString += `(with tempo: ${modifiers.tempo}) `;
  }
  
  if (effort) {
    if (effort?.value) {
      movementString += `at ${effort.value*100}`;
    }
    movementString += `${effort.method}`;
  }

  return movementString;
};