const jwt = require("jsonwebtoken");
const repository = require("../repository/repository");

async function doLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await repository.getUser(email, password);
    const token = jwt.sign(
      { userId: user._id, profileId: user.profileId },
      process.env.SECRET,
      {
        expiresIn: parseInt(process.env.EXPIRES),
      }
    );
    res.json({ token });
  } catch (err) {
    res.sendStatus(401);
  }
}

async function validateToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  token = token.replace("Bearer ", "");
  try {
    const { userId, profileId } = jwt.verify(token, process.env.SECRET);
    res.locals.userId = userId;
    res.locals.profileId = profileId;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}

async function doLogout(req, res, next) {
  const { userId } = res.locals;
  res.send(`Logout user ${userId}`);
}

module.exports = {
  doLogin,
  doLogout,
  validateToken,
};
