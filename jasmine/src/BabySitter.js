//Makes sure that only full hours are entered for start and end time.
checkFullHours = (shift) => {
  let isFullHours;

  if(shift[0].length > 4 || shift[1].length > 4){
    isFullHours = false
  }

  return isFullHours;
};

//Checks to see that start time is after 5pm and end time is no later than 4am.
setStartEndTime = (start, end) => {
  let startTimeInteger = Number(start.slice(0,-2));
  const startTimeOfDay = start.slice(-2);
  let validStart;

  validStart = (startTimeOfDay === 'pm' && startTimeInteger >= 5 && start !== '12pm') || (startTimeOfDay === 'am' && startTimeInteger < 4) || start === '12am';

  return validStart;
};