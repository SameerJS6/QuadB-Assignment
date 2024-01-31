const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatDate = (date) => {
  const filteredMonth = date?.slice(5, 7);
  const formattedMonth = months[filteredMonth - 1];
  const formattedDate = `${date?.slice(8, 10)} ${formattedMonth} ${date?.slice(
    0,
    4
  )}`;

  return formattedDate;
};

export { formatDate };
