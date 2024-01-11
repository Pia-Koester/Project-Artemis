const defineWeek = (skip) => {
  const today = new Date();

  today.setDate(today.getDate() + +skip);
  //const today = new Date("01.01.2025");
  const currentDayNumber = today.getDay(); // each day of the week corresponts to one numer 0 = sunday, 6 = saturday
  const daysOffset = {
    // currentDayNumber can help us identify how far away monday and sunday are
    0: { monday: -6, sunday: 0 },
    1: { monday: 0, sunday: 6 },
    2: { monday: -1, sunday: 5 },
    3: { monday: -2, sunday: 4 },
    4: { monday: -3, sunday: 3 },
    5: { monday: -4, sunday: 2 },
    6: { monday: -5, sunday: 1 },
  };
  const currentDay = today.getDate(); //this gets the day from the date so 02.04.2023 would be 2

  const mondayOffset = daysOffset[currentDayNumber].monday; //based on the day of the week 0-6 we check what the - or + for that monday are
  const sundayOffset = daysOffset[currentDayNumber].sunday;

  const formattedMondayDate = new Date(today);
  formattedMondayDate.setDate(currentDay + mondayOffset); //this sets the date for the monday of our week
  formattedMondayDate.setHours(0, 0, 0, 0);

  const formattedSundayDate = new Date(today);
  formattedSundayDate.setDate(currentDay + sundayOffset);
  formattedSundayDate.setHours(23, 59, 59, 999);

  // Formatting options for the final output
  const formattedOptions = {
    year: "2-digit",
    month: "short",
    day: "numeric",
  };

  const formattedMonday = formattedMondayDate.toLocaleDateString(
    "de-DE",
    formattedOptions
  );
  const formattedSunday = formattedSundayDate.toLocaleDateString(
    "de-DE",
    formattedOptions
  );

  const usMonday = formattedMondayDate.toLocaleDateString("en-US");
  const usSunday = formattedMondayDate.toLocaleDateString("en-US");
  return {
    formattedMonday,
    formattedSunday,
    formattedMondayDate,
    formattedSundayDate,
    usMonday,
    usSunday,
  };
};

export { defineWeek };
