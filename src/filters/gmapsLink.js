module.exports = (address) => {
  return "https://www.google.com.br/maps/place/" + address.replace(/ /g, '+');
};