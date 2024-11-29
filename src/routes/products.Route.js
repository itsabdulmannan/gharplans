const productController = require('../controllers/products.Controller');
const prodcustRoute = require('express').Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of all products
 *     description: Fetch all the products available in the store.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Smartphone"
 *                   description:
 *                     type: string
 *                     example: "Latest model with advanced features."
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 699.99
 *                   image:
 *                     type: string
 *                     example: "/images/smartphone.png"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-28T18:38:56.541Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-28T18:38:56.541Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

prodcustRoute.get('/products', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by its ID
 *     description: Fetch a product's details using its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A single product's details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Smartphone"
 *                 description:
 *                   type: string
 *                   example: "Latest model with advanced features."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 699.99
 *                 image:
 *                   type: string
 *                   example: "/images/smartphone.png"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T18:38:56.541Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T18:38:56.541Z"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

prodcustRoute.get('/products/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the store.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Smartphone"
 *               description:
 *                 type: string
 *                 description: A description of the product.
 *                 example: "Latest model with advanced features."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *                 example: 699.99
 *               image:
 *                 type: string
 *                 description: URL of the product image.
 *                 example: "/images/smartphone.png"
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Smartphone"
 *                 description:
 *                   type: string
 *                   example: "Latest model with advanced features."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 699.99
 *                 image:
 *                   type: string
 *                   example: "/images/smartphone.png"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T18:38:56.541Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T18:38:56.541Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

prodcustRoute.post('/products', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update a product's details by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Smartphone"
 *               description:
 *                 type: string
 *                 description: A description of the product.
 *                 example: "Latest model with advanced features."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *                 example: 699.99
 *               image:
 *                 type: string
 *                 description: URL of the product image.
 *                 example: "/images/smartphone.png"
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Smartphone"
 *                 description:
 *                   type: string
 *                   example: "Latest model with advanced features."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 699.99
 *                 image:
 *                   type: string
 *                   example: "/images/smartphone.png"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T18:38:56.541Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T18:38:56.541Z"
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

prodcustRoute.put('/products/:id', productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Remove a product from the store by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

prodcustRoute.delete('/products/:id', productController.deleteProduct);

module.exports = prodcustRoute;