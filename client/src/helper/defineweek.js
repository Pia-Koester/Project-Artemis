const defineWeek = () => {
  const today = new Date();
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

  const formattedSundayDate = new Date(today);
  formattedSundayDate.setDate(currentDay + sundayOffset);

  // Formatting options for the final output
  const formattedOptions = {
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
  return { formattedMonday, formattedSunday };
  console.log({ formattedMonday, formattedSunday });
};

export { defineWeek };
