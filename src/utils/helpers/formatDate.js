export const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return date.toLocaleDateString("ru-RU", options);
};

export default formatDate;
