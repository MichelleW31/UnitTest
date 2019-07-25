'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Makes sure that only full hours are entered for start and end time.
checkFullHours = function checkFullHours(shift) {
  var isFullHours = void 0;

  isFullHours = !(shift[0].length > 4 || shift[1].length > 4);

  return isFullHours;
};

//Checks to see that start time is after 5pm and end time is no later than 4am.
setStartEndTime = function setStartEndTime(start, end) {
  var startTimeInteger = Number(start.slice(0, -2));
  var startTimeOfDay = start.slice(-2);
  var validStart = void 0;

  var endTimeInteger = Number(end.slice(0, -2));
  var endTimeOfDay = end.slice(-2);
  var validEnd = void 0;

  validStart = startTimeOfDay === 'pm' && startTimeInteger >= 5 && start !== '12pm' || startTimeOfDay === 'am' && startTimeInteger < 4 || start === '12am';

  validEnd = endTimeOfDay === 'pm' && endTimeInteger > 5 && end !== '12pm' || endTimeOfDay === 'am' && endTimeInteger < 5 || end === '12am';

  return validStart === true && validEnd === true;
};

//Removes selected hours from array so they cant be selected more than once in one night.
//Makes sure sitter is only calculating pay for one family a night.
removeHours = function removeHours(startTime, endTime, totalHours, availableHoursLeft) {
  var startIndex = void 0;
  var endIndex = void 0;
  var newArr = void 0;

  availableHoursLeft.map(function (time, i) {
    if (startTime === time) {
      return startIndex = i;
    }
    if (endTime === time) {
      return endIndex = i;
    }
  });

  if (endIndex - startIndex === totalHours) {
    newArr = [].concat(_toConsumableArray(availableHoursLeft));
    newArr.splice(startIndex, totalHours);
  } else return false;

  return newArr;
};

//Calculates total number of hours in a shift.
calculateShiftHours = function calculateShiftHours(startTime, endTime) {
  var startingTime = Number(startTime.slice(0, -2));
  var endingTime = Number(endTime.slice(0, -2));

  if (endTime === '12am' || endingTime > startingTime) {
    return endingTime - startingTime;
  } else return 12 - startingTime + endingTime;
};

//Calculates pay for a shift
calculateShiftPay = function calculateShiftPay(shiftHours, payRate) {
  var rate = Number(payRate.slice(1));

  return shiftHours * rate;
};

//Calculates total pay for all shifts
calculateTotalPay = function calculateTotalPay(totalPayArray) {
  var totalPay = 0;

  totalPayArray.map(function (pay) {
    return totalPay += pay;
  });

  return '$' + totalPay;
};

calculateTotalShift = function calculateTotalShift(shifts) {
  var startingTimeFrame = ['5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am', '3am', '4am'];
  var totalPayArr = [];

  for (var i = 0; i < shifts.length; i++) {
    var startTime = shifts[i].startTime;
    var endTime = shifts[i].endTime;
    var payRate = shifts[i].payRate;

    var isFullHours = undefined.checkFullHours([startTime, endTime]);
    var validHours = undefined.setStartEndTime(startTime, endTime);
    var hoursWorked = undefined.calculateShiftHours(startTime, endTime);
    var availableHours = undefined.removeHours(startTime, endTime, hoursWorked, startingTimeFrame);

    if (!isFullHours) return 'Please only enter full hours';
    if (!validHours) return 'Start and/or end time are invalid for this shift: ' + startTime + ' - ' + endTime;
    if (availableHours === false) return startTime + ' - ' + endTime + ' shift not available.';

    startingTimeFrame = availableHours;
    totalPayArr.push(undefined.calculateShiftPay(hoursWorked, payRate));
  }

  return undefined.calculateTotalPay(totalPayArr);
};

module.exports.calculateTotalPay = calculateTotalPay;