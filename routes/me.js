var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

/* GET users listing. */
router.get('/', function(req, res) {
  res.render("profile", {
    title: "Thông tin tài khoản",
      user: req.user
    });
});

module.exports = router;
