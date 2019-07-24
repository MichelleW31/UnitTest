//Makes sure that only full hours are entered for start and end time.
checkFullHours = (shift) => {
  let isFullHours;

  if(shift[0].length > 4 || shift[1].length > 4){
    isFullHours = false
  }else{
    isFullHours = true;
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
calculateShiftHours = (startTime, endTime) => {
  let startingTime = Number(startTime.slice(0,-2));
  let endingTime = Number(endTime.slice(0,-2));

  if(endTime === '12am' || endingTime > startingTime){
    return endingTime - startingTime;
  }else {
    return (12 - startingTime) + endingTime;
  }
};

//Calculates pay for a shift
calculateShiftPay = (shiftHours, payRate) => {
  let rate = Number(payRate.slice(1));

  return shiftHours * rate;
};

//Calculates total pay for all shifts
calculateTotalPay = (totalPayArray) => {
  let totalPay = 0;

  totalPayArray.map(pay => totalPay += pay);

  return `$${totalPay}`;
};

calculateTotalShift = (shifts) => {
  let startingTimeFrame = ['5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am', '3am', '4am'];
  let totalPayArr= [];

  for(let i = 0; i< shifts.length; i++){
    let startTime = shifts[i].startTime;
    let endTime = shifts[i].endTime;
    let payRate = shifts[i].payRate;

    let isFullHours = checkFullHours([startTime, endTime]);
    let validHours = setStartEndTime(startTime, endTime);
    const hoursWorked = calculateShiftHours(startTime, endTime);
    let availableHours = removeHours(startTime, endTime, hoursWorked, startingTimeFrame);

    if(!isFullHours){
      return 'Please only enter full hours';
    }else{
      if(!validHours){
        return `Start and/or end time are invalid for this shift: ${startTime} - ${endTime}`
      }else{
        if(availableHours === false){
          return `${startTime} - ${endTime} shift not available.`;
        }else{
          startingTimeFrame = availableHours;
          totalPayArr.push(calculateShiftPay(hoursWorked, payRate));
        }
      }
    }
  }

  return calculateTotalPay(totalPayArr);
};