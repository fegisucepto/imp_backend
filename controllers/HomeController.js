const { User} = require('../models');


class HomeController {
  static async userList (req, res, next) {
    try {
      const userList = await User.findAll();
      res.status(200).json({
        statusCode: 200,
        data: userList,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = HomeController;
