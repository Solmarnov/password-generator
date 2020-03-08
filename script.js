// DOM elements
const passwordEl = document.getElementById('password');
const includeLengthEl = document.getElementById('passwordLength');
const includeLowerEl = document.getElementById('lowercase');
const includeUpperEl = document.getElementById('uppercase');
const includeNumbersEl = document.getElementById('numbers');
const includeSpecialEl = document.getElementById('special');
const generateEl = document.getElementById('generate');

// Character types as arrays
const lettersLowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const lettersUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Special characters: ' !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~'
const specials = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]

// Object containing each 'getRandom...' function
const getRandomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  special: getRandomSpecial
}

// Event listener for Generate Password button on click
generateEl.addEventListener('click', () => {
  // Store passwordLength element, as a number, in length
  const length = +includeLengthEl.value;
  // Store checked status of character types to be included
  const hasLower = includeLowerEl.checked;
  const hasUpper = includeUpperEl.checked;
  const hasNumber = includeNumbersEl.checked;
  const hasSpecial = includeSpecialEl.checked;

  passwordEl.textContent = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial
    );
});

// Generate password function 
function generatePassword(length, lower, upper, number, special) {
  // Container for the generated password 
  let generatedPassword = '';

  // A count of types which have been checked
  const typesCount = lower + upper + number + special;

  // An array of boolean results for types ***possible bug with typesArray object***
  const typesArray = [{ lower }, { upper }, { number }, { special }].filter(
    // Filter out items (i.e. lower, upper) which have a value of false
    item => Object.values(item)[0]
    );
  
  // IF passwordLength is < 8 OR > 128 THEN return alert
  if (length < 8 || length > 128) {
    alert('Choose a password length of at least 8 characters and no more than 128 characters')
  } 

  // ELSE IF typesCount is equal to 0 THEN return alert
  else if (typesCount === 0) {
    alert('Please choose at least one character type to include in your password.');
  }

  else {
    // For loop that will 
    for (let i = 0; i < length; i += typesCount) {
      // Run function 'for each' item in typesArray
      typesArray.forEach(type => {
        const functionName = Object.keys(type)[0];

        // Append (+=) random character generated into generatedPassword
        generatedPassword += getRandomFunctions[functionName]();
      });
    }
    // Slice excess characters from generatedPassword based on passwordLength
    const passwordOutput = generatedPassword.slice(0, length);
    return passwordOutput;
  }

}


// ***PASSWORD GENERATOR FUNCTIONS*** //

// Get random lowercase letter from lettersLowercase array
function getRandomLower() {
  return lettersLowercase[Math.floor(Math.random() * lettersLowercase.length)];
}

// Get random uppercase letter from lettersUppercase array
function getRandomUpper() {
  return lettersUppercase[Math.floor(Math.random() * lettersUppercase.length)];
}

// Get random number from numbers array
function getRandomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

// Get random specials character from specials array
function getRandomSpecial() {
  return specials[Math.floor(Math.random() * specials.length)];
}
