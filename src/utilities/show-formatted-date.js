const showFormattedDate = ({ locales = 'en-US', date }) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(locales, options);
};

export default showFormattedDate;
