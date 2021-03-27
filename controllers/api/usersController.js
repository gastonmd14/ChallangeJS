const bcryptjs = require("bcryptjs");
const db = require("../../database/models");

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

            let verified = bcryptjs.compareSync(req.body.password, r.password);

            if (verified != false) {

                req.session.user = r.email;
                req.session.userID = r.id;
                req.session.balanceID = r.balances.id;

            let responsd = {

                meta: {
                    status: 200,
                    total: r.length,
                    url: "/api/users/",
                },

                data: r,

                }

                res.json(responsd);

            } else {

                res.json("User Not Found");
            }
        })
        
    }
    
}