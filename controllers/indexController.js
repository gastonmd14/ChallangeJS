var express = require("express");
var router = express.Router();

const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  home: (req, res, next) => {
    // console.log(req.session);

    if (req.session.user) {
      let showRecord = db.Record.findAll({
        include: [
          {
            association: "balances",
            where: {
              users_id: req.session.userID,
            },
          },
        ],
        limit: 10,
        order: ["date"],
      });

      let showBalance = db.Balance.findOne({
        where: {
          users_id: req.session.userID,
        },
      });
      Promise.all([showRecord, showBalance])
        .then(([showRecord, showBalance]) => {
          // let text = (r[1].date).toLocaleDateString('es-AR')
          // console.log(text);

          // console.log(showBalance.total);

          res.render("index", {
            title: "index",
            style: "create-record-form",
            record: showRecord,
            balance: showBalance,
          });
        })

        .catch((e) => {
          console.log(e);
        });
    } else {
      res.render("index", {
        title: "index",
        style: "create-record-form",
        balance: {},
      });
    }
  },

  create: (req, res, next) => {
    db.Balance.findOne({
      where: {
        users_id: req.session.userID,
      },
    }).then((r) => {
      if (r) {
        res.render("create-record-form", {
          title: "Create",
          style: "create-record-form",
          result: r,
        });
      }
    });
  },

  store: (req, res, next) => {
    // console.log(req.body);
    function plus(num) {
      let acum = req.body.amount;
      acum = parseInt(acum) + parseInt(num);
      return acum;
    }

    let addRecord = db.Record.create({      
      date: req.body.date,
      category: req.body.category,
      type: req.body.type,
      concept: req.body.concept,
      amount: req.body.amount,
      balances_id: req.session.balanceID,
    });

    let saveBalance = db.Balance.update(
      {
        total: plus(req.body.total),
      },
      {
        where: {
          id: req.session.balanceID,
        },
      }
    );

    Promise.all([addRecord, saveBalance])
      .then(([addRecord, saveBalance]) => {

        // console.log(addRecord);
        // console.log(saveBalance);
        res.redirect("/");
      })

      .catch((e) => {
        console.log(e);
      });
  },

  edit: (req, res, next) => {

    let findBalance = db.Balance.findOne({
      where: {
        id: req.session.balanceID
      }
    })

    let findRecord = db.Record.findByPk(req.params.id)

    Promise.all([findBalance, findRecord])
      .then(([findBalance, findRecord]) => {
        // console.log(r);
        req.session.actualAmount = findRecord.amount
        res.render("edit-record-form", {
          title: "edit",
          style: "edit-record-form",
          data: findRecord,
          data2: findBalance
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  update: (req, res, next) => {
    function plus(num) {
      let acum = req.body.amount;
      acum = parseInt(acum) + parseInt(num) - parseInt(req.session.actualAmount);
      return acum;
    }
    // console.log(req.params);
    // console.log(req.body);
    let updateRecord = db.Record.update(
      {
        date: req.body.date,
        category: req.body.category,
        type: req.body.type,
        concept: req.body.concept,
        amount: req.body.amount,
        balances_id: req.session.balanceID,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    let updateBalance = db.Balance.update(
      {
        total: plus(req.body.total),
      },
      {
        where: {
          id: req.session.balanceID,
        },
      }
    );

    Promise.all([updateRecord, updateBalance])
      .then(([updateRecord, updateBalance]) => {
        res.redirect("/");
      })
      .catch((e) => {
        console.log(e);
      });
  },

  destroy: (req, res, next) => {
    console.log(req.body);
    console.log(req.params);

    function plus(num) {
      let acum = req.body.amount;
      acum = - parseInt(acum) + parseInt(num);
      return acum;
    }

    let deleteRecord = db.Record.destroy({
      where: {
        id: req.params.id,
      },
    })

    let updateBalance = db.Balance.update(
      {
        total: plus(req.body.total),
      },
      {
        where: {
          id: req.session.balanceID,
        },
      }
    )
    Promise.all([deleteRecord, updateBalance])
      .then(([deleteRecord, updateBalance]) => {
        res.redirect("/");
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
