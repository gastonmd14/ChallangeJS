const db = require('../../database/models');


module.exports = {

    home: (req, res, next) => {
        if (req.session.user) {
          db.Record.findAll({
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
          })   
          
          .then((r) => {

              let responsd = {
                  meta: {
                      status: 200,
                      total: r.lenght,
                      url: '/api/'
                  },
                  data: r
              }

              res.json(responsd)

            })

          }
          
    }

}