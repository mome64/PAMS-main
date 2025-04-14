const installService = require("../service/install.service");

async function install(req, res, next) {
  const installMessage = await installService.install();

  if (installMessage.status === 200) {
    res.status(200).json({
      message: installMessage,
    });
  } else {
    res.status(500).json({
      message: installMessage,
    });
  }
}

module.exports = { install };
