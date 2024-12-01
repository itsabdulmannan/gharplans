const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productInfo: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    paymentType: {
        type: DataTypes.ENUM('cod', 'card'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'order',
    timestamps: true,
});

module.exports = Order;