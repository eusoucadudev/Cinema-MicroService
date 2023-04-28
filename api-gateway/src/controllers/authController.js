const jwt = require("jsonwebtoken");
const repository = require("../repository/repository");
const loginSchema = require("../schemas/login");

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

async function validateBlacklist(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return next();
  token = token.replace("Bearer ", "");
  const isBlacklisted = await repository.checkBlackList(token);

  if (isBlacklisted) return res.sendStatus(401);
  else next();
}

async function validateLoginSchema(req, res, next) {
  const schema = require("../schemas/login");

  const { error } = schema.validate(req.body);
  if (error) {
    const { details } = error;

    return res.status(422).json(details.map((d) => d.message));
  }
  next();
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
  let token = req.headers["authorization"];
  token = token.replace("Bearer ", "");
  await repository.blacklistToken(token);
  res.sendStatus(200);
}

module.exports = {
  doLogin,
  doLogout,
  validateToken,
  validateBlacklist,
  validateLoginSchema,
};
