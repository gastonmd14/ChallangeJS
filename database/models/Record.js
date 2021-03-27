module.exports = (sequelize, datatypes) => {
    let alias = "Record"
    let cols = {

        id: {
            type: datatypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        date: {
            type: datatypes.DATE,
            allowNull: false,
        },

        category: {
            type: datatypes.STRING,
            allowNull: false
        },

        concept: {
            type: datatypes.STRING,
            allowNull: false
        },

        type: {
            type: datatypes.STRING,
            allowNull: false,
        },

        amount: {
            type: datatypes.DECIMAL(10, 2),
            allowNull: false,
        },
 
    }

    let config = {
        tableName: "records",
        timestamps: false

    }

    let Record = sequelize.define(alias, cols, config);

    Record.associate = function(models) { 
        Record.belongsTo(models.Balance, {
            as: "balances",
            foreignKey: "balances_id"
        }) 
        
    };

    
    return Record;

};