var express = require("express");
var router = express.Router();
var Passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get("/", function(req, res) {
  res.render("index", { title: "Trang chủ" });
});

router.get("/user/login", function(req, res) {
  res.render("login", { title: "Đăng nhập" });
});
router.post("/user/login", function(req, res, next) {
  Passport.authenticate("local", (err, user, info) => {
    if (err)
        return next(err);
    if (!user) {
        return res.status(403).send({
            code: 403,
            message: info.message
        })
    }

    req.login(user, err => {
        const token = jwt.sign(user.id, 'xuantam0304')
        if (err) return next(err);
        return res.json({user, token});

    });
})(req, res, next);
})

router.get("/user/register", function(req, res) {
  res.render("register", { title: "Đăng ký" });
});

router.post("/user/register", function(req, res) {
  const { email, password, fullname, phone, address } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      res.render("register", {
        email,
        password,
        fullname,
        phone,
        address
      });
    } else {
      const newUser = new User({
        email,
        password,
        fullname,
        phone,
        address
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (!err) {
            newUser.password = hash;
            newUser.save();
            res.redirect("/user/login");
          }
        });
      });
    }
  });
});

module.exports = router;
