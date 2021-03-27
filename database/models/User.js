module.exports = (sequelize, datatypes) => {
    let alias = "User"
    let cols = {

        id: {
            type: datatypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        email: {
            type: datatypes.STRING,
            allowNull: false
        },

        password: {
            type: datatypes.STRING,
            allowNull: false,
            defaultValue: "0"
        }

    }

    let config = {
        tableName: "users",
        timestamps: false

    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) { 
       User.hasOne(models.Balance, {
           as: "balances",
           foreignKey: "users_id"
       }) 
    };

    
    return User;

};