import { WEEK_DAYS } from "./Constants";

export const unixToUtcDate = (UNIXDate: number) => {
  const UTCDateObject = new Date(UNIXDate * 1000);

  return `${UTCDateObject.getUTCDate()}.${
    UTCDateObject.getMonth() < 10
      ? "0" + (UTCDateObject.getMonth() + 1)
      : UTCDateObject.getMonth() + 1
  }.${UTCDateObject.getFullYear()}`;
};

export const unixToUtcTime = (UNIXDate: number) => {
  const dateObject = new Date(UNIXDate * 1000);
  console.log(dateObject);

  return `${dateObject.getHours()}:${dateObject.getMinutes()}`;
};

export const weekDayName = (weekDayNumber: number) => {
  const date = new Date();
  return (
    WEEK_DAYS[date.getDay() + weekDayNumber] ||
    WEEK_DAYS[date.getDay() + weekDayNumber - 7] ||
    "Que?"
  );
};
