const Login = require("../../models/logins");
const jwt = require("jsonwebtoken");

exports.findCount = async (req, res) => {
  const login = await Login.findOne({
    where: { login_id: req.params.loginId },
  });
  return res.json({
    login_email: login.login_email,
    login_name: login.login_name,
    login_id: login.login_id,
    login_count: login.login_count,
  });
};

exports.findAll = async (req, res) => {
  try {
    const list = await Login.findAll();
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.findOne = async (req, res) => {
  try {
    const login = await Login.findOne({
      where: { login_id: req.params.loginId },
    });
    return res.json({
      login_email: login.login_email,
      login_name: login.login_name,
      login_id: login.login_id,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.update = async (req, res) => {
  let savedLogin = await Login.update(
    {
      login_email: req.body.loginEmail,
      login_password: req.body.loginPassword,
      login_name: req.body.loginName,
      login_photo_url: req.body.loginPhotoUrl,
    },
    {
      where: { login_id: req.params.loginId },
    }
  );

  const login = await Login.findOne({
    where: { login_id: req.params.loginId },
  });

  return res.status(201).json({
    loginId: login.login_id,
    loginName: login.login_name,
    loginEmail: login.login_email,
  });
};

exports.unnactive = async (req, res) => {
  const login = await Login.findOne({
    where: { login_id: req.params.loginId },
  });

  await Login.update(
    {
      ...login,
      login_email: "inativo_" + login.login_email,
    },
    {
      where: { login_id: req.params.loginId },
    }
  );

  return res.status(200).json({});
};

exports.delete = async (req, res) => {
  await Login.destroy({
    where: { login_id: req.params.loginId },
  });

  return res.status(200);
};

exports.login = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  let response;

  Login.findOne({
    where: {
      login_email: loginEmail,
    },
  })
    .then((login) => {
      if (login) {
        if (loginPassword === login.login_password) {
          const token = jwt.sign({ user: loginEmail }, process.env.JWT_KEY, {
            expiresIn: 10000,
          });

          let count = login.login_count;
          if (count === null) {
            count = 1;
          } else {
            count = Number(count) + 1;
          }

          Login.update(
            {
              login_count: count,
            },
            {
              where: { login_id: login.login_id },
            }
          );

          response = res.status(200).json({
            loginId: login.login_id,
            loginName: login.login_name,
            loginEmail: loginEmail,
            accessToken: token,
          });
        } else {
          response = res.status(400).json({ error: "Invalid credentials" });
        }
      } else {
        response = res.status(400).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log("\n ERROR: ", err, "\n");
      response = res.status(500).json({ error: "Login query error" });
    });

  return response;
};
