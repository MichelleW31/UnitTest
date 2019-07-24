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

  let endTimeInteger = Number(end.slice(0,-2));
  const endTimeOfDay = end.slice(-2);
  let validEnd;

  validStart = (startTimeOfDay === 'pm' && startTimeInteger >= 5 && start !== '12pm') || (startTimeOfDay === 'am' && startTimeInteger < 4) || start === '12am';

  validEnd = (endTimeOfDay === 'pm' && endTimeInteger > 5 && end !== '12pm') || (endTimeOfDay === 'am' && endTimeInteger < 5) || end === '12am';

  if(validStart === true && validEnd ===true){
    return true
  }else{
    return false
  }
};

//Removes selected hours from array so they cant be selected more than once in one night.
//Makes sure sitter is only calculating pay for one family a night.
removeHours = (startTime, endTime, totalHours, availableHoursLeft) => {
  let startIndex;
  let endIndex;
  let newArr;

  availableHoursLeft.map((time, i) => {
    if(startTime === time){
      return startIndex = i;
    }
    if(endTime === time){
      return endIndex = i;
    }
  });

  if((endIndex - startIndex) === totalHours){
    newArr = [...availableHoursLeft];
    newArr.splice(startIndex, totalHours);
  }else return false;

  return newArr
};

//Calculates total number of hours in a shift.
calculateHours = (startTime, endTime) => {
  let startingTime = Number(startTime.slice(0,-2));
  let endingTime = Number(endTime.slice(0,-2));

  if(endTime === '12am' || endingTime > startingTime){
    return endingTime - startingTime;
  }else {
    return (12 - startingTime) + endingTime;
  }
};