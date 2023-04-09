const database = require("../config/database");

async function getUser(email, password) {
  const db = await database.connect();
  const user = await db.collection("users").findOne({ email });

  if (!user) throw new Error("User not found!");
  return user;
  // Fazer criptografia da senha no banco de dados
}

module.exports = {
  getUser,
};
