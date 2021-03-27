module.exports = (sequelize, datatypes) => {
    let alias = "Balance"
    let cols = {

        id: {
            type: datatypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        total: {
            type: datatypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: "0.00"
        },
 
    }

    let config = {
        tableName: "balances",
        timestamps: false

    }

    let Balance = sequelize.define(alias, cols, config);

    Balance.associate = function(models) { 
        Balance.belongsTo(models.User, {
            as: "users",
            foreignKey: "users_id"
        }),
        Balance.hasMany(models.Record, {
            as: "records",
            foreignKey: "balances_id"
        }) 
        
    };

    
    return Balance;

};