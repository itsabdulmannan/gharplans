const orderROuter = require('express').Router();
const orderController = require('../controllers/order.Controller');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user placing the order
 *               productInfo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productName:
 *                       type: string
 *                       description: Name of the product
 *                     category:
 *                       type: string
 *                       description: Category of the product
 *                     singleProductprice:
 *                       type: string
 *                       description: Price of a single product
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *                     itemTotal:
 *                       type: string
 *                       description: Total price for the quantity of the product
 *                     deliveryCharges:
 *                       type: string
 *                       description: Delivery charges for this product
 *               totalAmount:
 *                 type: string
 *                 description: Total amount of the order, including products and delivery charges
 *               paymentType:
 *                 type: string
 *                 description: Type of payment (e.g., "Credit Card", "Cash")
 *               sourceCity:
 *                 type: string
 *                 description: The city from which the entire order is being shipped
 *               destinationCity:
 *                 type: string
 *                 description: The city where the entire order is being delivered
 *     responses:
 *       201:
 *         description: Order added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal server error
 */

orderROuter.post('/', orderController.addOrder);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the order
 *     responses:
 *       200:
 *         description: Order data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 orderData:
 *                   type: object
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
orderROuter.get('/:orderId', orderController.getOrderById);

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the order
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
orderROuter.delete('/:orderId', orderController.cancelOrder);

/**
 * @swagger
 * /orders/{orderId}/upload-screenshot:
 *   post:
 *     summary: Upload a screenshot for payment verification
 *     description: Allows the user to upload a screenshot of the payment for the specified order.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               screenshot:
 *                 type: string
 *                 description: URL or path to the uploaded screenshot.
 *                 example: "https://example.com/screenshots/payment123.jpg"
 *     responses:
 *       200:
 *         description: Screenshot uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Screenshot uploaded successfully."
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

orderROuter.post('/:orderId/upload-screenshot', orderController.uploadScreenShot);

/**
 * @swagger
 * /orders/{orderId}/verify-payment:
 *   put:
 *     summary: Verify the payment and update the order status
 *     description: Verifies the payment status for the specified order and updates its status accordingly.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 description: The payment status of the order.
 *                 example: "confirmed"
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Payment status updated successfully."
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

orderROuter.put('/:orderId/verify-payment', orderController.verifyPayment);

module.exports = orderROuter;