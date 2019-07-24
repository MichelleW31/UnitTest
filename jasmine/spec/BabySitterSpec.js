//Check for full hours
//Check that start time is valid
//Check that end time is valid

describe('Babysitter\'s Time', () =>{
  it('Checks for full hours', () => {
    const result = checkFullHours(['5:15pm','6am']);
    const result2 = checkFullHours(['5pm','6:15am']);

    expect(result).toBe(false);
    expect(result2).toBe(false);
  });

  it('Sets start time', () => {
    const result = setStartEndTime('12am', '1am');
    const result2 = setStartEndTime('12pm', '1am');

    expect(result).toEqual(true);
    expect(result2).toBe( false);
  });

  it('Sets end time', () => {
    const result = setStartEndTime('5pm', '12am');
    const result2 = setStartEndTime('5pm', '12pm');

    expect(result).toEqual(true);
    expect(result2).toBe(false);
  });
});