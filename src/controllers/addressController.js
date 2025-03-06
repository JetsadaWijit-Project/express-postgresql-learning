const Address = require("../models/Address");

exports.addAddress = async (req, res) => {
  const { street, city, country } = req.body;
  const userId = req.session.user.id;

  try {
    const newAddress = await Address.create({ userId, street, city, country });
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAddresses = async (req, res) => {
  const userId = req.session.user.id;

  try {
    const addresses = await Address.findAll({ where: { userId } });
    res.render("address", { user: req.session.user, addresses });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
