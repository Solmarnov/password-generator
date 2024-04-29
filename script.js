// DOM elements
const password = document.getElementById('password');
const passwordLength = document.getElementById('passwordLength');
const isLowerCase = document.getElementById('lowercase');
const isUpperCase = document.getElementById('uppercase');
const isNumbers = document.getElementById('numbers');
const isSpecialCase = document.getElementById('special');
const generatePasswordButton = document.getElementById('generate');

// Character types as arrays
const alphaLowerCaseArray = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];
const alphaUpperCaseArray = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Special characters: '!#$%&*+-=?@^_~'
const specialCharactersArray = [
  "!", "#", "$", "%", "&", "*", "+", "-", "=", "?", "@", "^", "_", "~"
]

// Event listener for Generate Password button on click
generatePasswordButton.addEventListener('click', () => {
  // Store passwordLength value as a number
  const length = +passwordLength.value;
  // Store checked status of character types to be included
  const isLowerCaseChecked = isLowerCase.checked;
  const isUpperCaseChecked = isUpperCase.checked;
  const isNumbersChecked = isNumbers.checked;
  const isSpecialCaseChecked = isSpecialCase.checked;
  // A count of types which have been checked
  const characterTypesCount = isLowerCaseChecked + isUpperCaseChecked + isNumbersChecked + isSpecialCaseChecked;

  checkPasswordLengthValid(length) ? alert(
    'Choose a password length of at least 8 characters and no more than 128 characters'
  ) :
  checkCharacterTypeSelected(characterTypesCount) ? alert(
    'Please choose at least one character type to include in your password.'
  ) : 
  password.value = generatePassword(
    length,
    isLowerCaseChecked,
    isUpperCaseChecked,
    isNumbersChecked,
    isSpecialCaseChecked
    );
});

// Generate password function 
function generatePassword(length, lowerCase, upperCase, numbers, specialCharacters) {
  // Container for the generated password 
  let passwordCharactersArray = [];
  let generatedPassword = '';

  if (lowerCase) {
    passwordCharactersArray += [...alphaLowerCaseArray]
  }
  if (upperCase) {
    passwordCharactersArray += [...alphaUpperCaseArray]
  }
  if (numbers) {
    passwordCharactersArray += [...numbersArray]
  }
  if (specialCharacters) {
    passwordCharactersArray += [...specialCharactersArray]
  }

  for (let i = 0; i < length; i++) {
    let randomCharacter = '';
    randomCharacter = passwordCharactersArray[Math.floor(Math.random() * passwordCharactersArray.length)];
    // Prevent commas from being added to generatedPassword
    randomCharacter === ',' ? i-- : generatedPassword += randomCharacter;
  }
  return generatedPassword;
}

// ***FORM VALIDATION FUNCTIONS*** //
function checkPasswordLengthValid(length) {
  const minLength = 8
  const maxLength = 32
  return length < minLength || length > maxLength
}

function checkCharacterTypeSelected(typesCount) {
  return typesCount === 0
}
