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

  it('Make hours unavailable to pick once they are included in a shift', () => {
    let availableHoursLeft = ['5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am', '3am', '4am'];
    const result = removeHours('8pm', '1am', 5, availableHoursLeft);

    expect(result).toEqual(['5pm','6pm', '7pm', '1am', '2am', '3am', '4am']);
  });
});

describe('Babysitter\'s Pay', () => {
  it('Calculates total hours entered for shift', () => {
    const result = calculateShiftHours('11pm', '3am');
    const result2 = calculateShiftHours('7pm', '4am');

    expect(result).toBe(4);
    expect(result2).toBe(9);
  });

  it('Calculates pay based off of total hours and pay rate for shift', () => {
    const result = calculateShiftPay(5, '$15');

    expect(result).toBe(75)
  });

  it('Calculates total pay for one night of work', () =>{
    const result = calculateTotalPay([1300, 60]);

    expect(result).toBe('$1360');
  });

  it('Calculates babysitters pay based off of shifts and pay rate', () => {
    const shift1 = {startTime: '5pm', endTime: '11pm', payRate: '$5'};
    const shift2 = {startTime: '11pm', endTime: '3am', payRate: '$10'};

    const shift3 = {startTime: '4pm', endTime: '11pm', payRate: '$5'};
    const shift4 = {startTime: '11pm', endTime: '3am', payRate: '$10'};

    const shift5 = {startTime: '5pm', endTime: '11pm', payRate: '$5'};
    const shift6 = {startTime: '11:15pm', endTime: '3am', payRate: '$10'};

    const result = calculateTotalShift([shift1, shift2]);
    const result2 = calculateTotalShift([shift3, shift4]);
    const result3 = calculateTotalShift([shift5, shift6]);

    expect(result).toBe('$70');
    expect(result2).toBe('Start and/or end time are invalid for this shift: 4pm - 11pm');
    expect(result3).toBe('Please only enter full hours');
  });
});