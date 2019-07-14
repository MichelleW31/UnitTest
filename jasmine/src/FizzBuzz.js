//Function should take number
//If number is a multiple of 3 and 5, return FizzBuzz
//If number is a multiple of 3, return Fizz
//If number is a multiple of 5, return Buzz
//If number is not multiple by 3 or 5, return the number

const fizzBuzz = (number) => {
  if(typeof number !== 'number' || number === '') return 'Please enter a number';
  if(number % 3 === 0 && number % 5 === 0) return 'FizzBuzz';
  if (number % 3 === 0) return 'Fizz';
  if (number % 5 === 0) return 'Buzz';
  else return number;
};



