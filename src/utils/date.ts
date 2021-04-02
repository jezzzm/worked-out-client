import daysjs from 'dayjs';
export const parseShortDate = (dateString) => {
  return daysjs(dateString, 'YYYYMMDD');
};

export const getDayAndPrettyDate = (dateString) => {
  const date = parseShortDate(dateString);

  return [date.format('dddd'), date.format('MMMM D')];
};