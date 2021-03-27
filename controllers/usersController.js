var express = require("express");
var router = express.Router();
const bcryptjs = require("bcryptjs");

const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  login: (req, res, next) => {
    res.render("users/login-form", {
      title: "users",
      style: "users/login-form",
    });
  },

  checkLogin: (req, res, next) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
      include: ["balances"],
    })
      .then((r) => {
        // req.session.totalBalance = parseInt(r.balances.total)

        // console.log(r);
        // console.log(req.session);

        let verified = bcryptjs.compareSync(req.body.password, r.password);
        console.log(verified);
        if (verified != false) {
          req.session.user = r.email;
          req.session.userID = r.id;
          req.session.balanceID = r.balances.id;
          res.redirect("/");
        } else {
          res.redirect("login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  register: (req, res, next) => {
    res.render("users/register-form", {
      title: "users",
      style: "users/register-form",
    });
  },

  storeRegister: (req, res, next) => {
    db.User.create({
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
    })

      .then((r) => {
        // console.log(r);

        r.createBalances();

        res.redirect("login");
      })

      .catch((e) => {
        console.log(e);
      });
  },

  logout: (req, res, next) => {
    req.session.destroy();
    return res.redirect("login");
  },
};
