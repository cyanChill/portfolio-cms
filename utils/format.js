import { format } from "date-fns";

export const postDateFormat = (date) => {
  return format(new Date(date), "dd MMMM yyyy");
};

export const postDateTimeFormat = (date) => {
  return format(new Date(date), "dd MMMM yyyy '('pp')'");
};
