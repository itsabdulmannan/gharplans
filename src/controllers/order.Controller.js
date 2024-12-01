const order = require('../models/order.Model');
const User = require('../models/user.Model');
const sequelize = require('../config/database');
const cart = require('../models/cart.Model');

const orderController = {
    generateOrderId: () => {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
        return `GharPlans-${date}-${randomString}`;
    },
    addOrder: async (req, res) => {
        const generatedOrderId = orderController.generateOrderId();
        const { userId, productInfo, totalAmount, paymentType } = req.body;

        const transaction = await sequelize.transaction();

        try {
            const orderData = {
                userId,
                productInfo,
                totalAmount,
                paymentType,
                orderId: generatedOrderId
            };
            const newOrder = await order.create(orderData, { transaction });

            await cart.destroy({
                where: { userId },
                transaction
            });

            await transaction.commit();

            res.status(201).json({
                status: true,
                message: "Order added successfully and cart cleared.",
                data: newOrder
            });
        } catch (error) {
            await transaction.rollback();
            console.error("Error in addOrder: ", error);
            res.status(500).json({ status: false, message: "Internal server error." });
        }
    },
    getOrderById: async (req, res) => {
        const { orderId } = req.params;
        try {
            const orderData = await order.findOne({
                where: { orderId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email'],
                    }
                ]
            });

            if (orderData) {
                const responseData = {
                    ...orderData.toJSON(),
                };

                delete responseData.userId;

                res.status(200).json({ status: true, orderData: responseData });
            } else {
                res.status(404).json({ status: false, message: "Order not found." });
            }
        } catch (error) {
            console.error("Error in getOrderById: ", error);
            res.status(500).json({ status: false, message: "Internal server error." });
        }
    },
    cancelOrder: async (req, res) => {
        const { orderId } = req.params;
        try {
            const orderData = await order.findOne({ where: { orderId } });
            if (orderData) {
                await order.destroy({ where: { orderId } });
                res.status(200).json({ status: true, message: "Order deleted successfully." });
            } else {
                res.status(404).json({ status: false, message: "Order not found." });
            }
        } catch (error) {
            console.error("Error in deleteOrder: ", error);
            res.status(500).json({ status: false, message: "Internal server error." });
        }
    },
};

module.exports = orderController;
