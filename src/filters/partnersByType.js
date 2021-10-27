module.exports = (partners, type) => {
  return partners.filter((partner) => partner.type == type);
};
