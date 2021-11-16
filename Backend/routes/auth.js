const router = require("express").Router();
const User = require("../models/User_Model.js");
const CryptoJS = require("crypto-js");
// Link to cryptoJS docs to explain how secure it is and how to use it
// https://cryptojs.gitbook.io/docs/

// Link to npm and how to encrypt and decrypt under API section
// https://www.npmjs.com/package/crypto-js
const jwt = require("jsonwebtoken");

// Register user
router.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    // add crypto js. copy this from docs. replace message with users registered password. Then make up own secret key in your .env file
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    // Because of this our password in database is now encrypted. Adding security to users private information.
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.json(user);
    }
  });
});

// User sign in
router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json("email does not exist");
    }
    // Now we have to see if user password is the same
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.json("incorrect password");
    } else {
      // Destructure user to where even the encrypted password does not show to be extra secure.
      const { password, ...userInfo } = user._doc; // when returning just user look at log and you will see it returns a bunch of things like req does. user._doc returns just user info.

      // add accessToken so only the user can change things on his account
      const accessToken = jwt.sign(
        { email: user.email, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "3d" } // has to sign in again after 3 days #security
      );
      // return the destructuted user.
      return res.json({ ...userInfo, accessToken });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

/* 
Steps.  
1) register a user (easy)
2) login a user (easy)
3) add cryptoJS and encrypt users inputed password on register (easy once you have docs and done it once)
4) decrypt password on login (easy once you have docs and done it once)
5) destructure user object so we only res.json() the userInfo that is not private (easy once you have docs and done it once)
6) Add JWT 
*/
