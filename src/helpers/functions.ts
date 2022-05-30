//consts
import { daysArray, monthsArray } from "helpers/consts";

export const createDate = (dateObject: Date) => {
  const day = daysArray[dateObject.getDay()];
  const date = dateObject.getDate();
  const month = monthsArray[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};
