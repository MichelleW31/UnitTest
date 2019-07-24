//Makes sure that only full hours are entered for start and end time.
checkFullHours = (shift) => {
  let isFullHours;

  if(shift[0].length > 4 || shift[1].length > 4){
    isFullHours = false
  }

  return isFullHours;
};