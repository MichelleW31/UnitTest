describe('FizzBuzz Test', () => {
  it('Should not run function if input isn\'t a number', () =>{
    //act
    const result = fizzBuzz('my input');

    //assert
    expect(result).toBe('Please enter a number');
  });

  it('Should return number if not multiple of 3 or 5', () => {
    const result = fizzBuzz(1);

    expect(result).toBe(1);
    assertEquals()
  });

  it('Should return Fizz for multiples of 3', () => {
    //act
    const result = fizzBuzz(3);
    const result2 = fizzBuzz(6);
    const result3 = fizzBuzz(9);

    //assert
    expect(result).toBe('Fizz');
    expect(result2).toBe('Fizz');
    expect(result3).toBe('Fizz');
  });

  it('Should return Buzz for multiples of 5', () => {
    //act
    const result = fizzBuzz(5);
    const result2 = fizzBuzz(10);
    const result3 = fizzBuzz(20);

    //assert
    expect(result).toBe('Buzz');
    expect(result2).toBe('Buzz');
    expect(result3).toBe('Buzz');
  });

  it('Should return FizzBuzz for multiples of 3 and 5', () => {
    //act
    const result = fizzBuzz(15);
    const result2 = fizzBuzz(30);
    const result3 = fizzBuzz(45);

    //assert
    expect(result).toBe('FizzBuzz');
    expect(result2).toBe('FizzBuzz');
    expect(result3).toBe('FizzBuzz');
  });

});