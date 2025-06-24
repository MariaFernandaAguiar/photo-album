const Joi = require("joi");

const LoginSchema = Joi.object({
  login_id: Joi.number().integer().positive().optional(),
  login_email: Joi.string().email().required(),
  login_password: Joi.string().required(),
  login_name: Joi.string().required(),
  login_photo_url: Joi.string().allow(null).optional(),
});

module.exports = {
  validateLoginId: function (req, res, next) {
    const { error, value } = Joi.number()
      .integer()
      .greater(0)
      .validate(req.params.loginId);

    if (error) {
      return res.status(500).json({ status: false, msg: error });
    }

    req.params.id = value;
    return next();
  },
  validateLogin: function (req, res, next) {
    const { error, value } = LoginSchema.validate(req.body);
    if (error) {
      return res.json({ status: false, msg: error });
    }
    req.body = value;
    return next();
  },
};
