const productController = require('../controllers/products.Controller');
const prodcustRoute = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve a product or a list of products
 *     description: Fetch all the products available in the store or a specific product by its ID if the 'id' query parameter is provided.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: The ID of the product to retrieve. If not provided, fetches all products.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A product or a list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     categoryId:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "Smartphone"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 699.99
 *                     image:
 *                       type: string
 *                       example: "/images/smartphone.png"
 *                     description:
 *                       type: string
 *                       example: "Latest model with advanced features."
 *                     shortDescription:
 *                       type: string
 *                       example: "Advanced smartphone with amazing features."
 *                     addiotionalInformation:
 *                       type: string
 *                       example: "Includes a free case and screen protector."
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     options:
 *                       type: object
 *                       example: { "color": "black", "memory": "64GB" }
 *                     color:
 *                       type: string
 *                       example: "black"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-28T18:38:56.541Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-28T18:38:56.541Z"
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
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

prodcustRoute.get('/', productController.getProducts);

/**
 * @swagger
 * /product:
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
 *               categoryId:
 *                 type: integer
 *                 description: The category ID of the product.
 *                 example: 2
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
 *               shortDescription:
 *                 type: string
 *                 description: A short description of the product.
 *                 example: "Advanced smartphone with amazing features."
 *               addiotionalInformation:
 *                 type: string
 *                 description: Additional information about the product.
 *                 example: "Includes a free case and screen protector."
 *               status:
 *                 type: boolean
 *                 description: Whether the product is active or not.
 *                 example: true
 *               options:
 *                 type: object
 *                 description: Optional attributes like color, size, etc.
 *                 example: { "color": "black", "memory": "64GB" }
 *               color:
 *                 type: object
 *                 description: Available color options for the product.
 *                 example: { "primary": "black", "secondary": "white" }
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
 *                 categoryId:
 *                   type: integer
 *                   example: 2
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
 *                 shortDescription:
 *                   type: string
 *                   example: "Advanced smartphone with amazing features."
 *                 addiotionalInformation:
 *                   type: string
 *                   example: "Includes a free case and screen protector."
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 options:
 *                   type: object
 *                   example: { "color": "black", "memory": "64GB" }
 *                 color:
 *                   type: object
 *                   example: { "primary": "black", "secondary": "white" }
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

prodcustRoute.post('/', authenticate, authorize('admin'), productController.createProduct);

/**
 * @swagger
 * /product/{id}:
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
 *               categoryId:
 *                 type: integer
 *                 description: The category ID of the product.
 *                 example: 2
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
 *               shortDescription:
 *                 type: string
 *                 description: A short description of the product.
 *                 example: "Advanced smartphone with amazing features."
 *               addiotionalInformation:
 *                 type: string
 *                 description: Additional information about the product.
 *                 example: "Includes a free case and screen protector."
 *               status:
 *                 type: boolean
 *                 description: Whether the product is active or not.
 *                 example: true
 *               options:
 *                 type: object
 *                 description: Optional attributes like color, size, etc.
 *                 example: { "color": "black", "memory": "64GB" }
 *               color:
 *                 type: string
 *                 description: The color of the product.
 *                 example: "black"
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
 *                 categoryId:
 *                   type: integer
 *                   example: 2
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
 *                 shortDescription:
 *                   type: string
 *                   example: "Advanced smartphone with amazing features."
 *                 addiotionalInformation:
 *                   type: string
 *                   example: "Includes a free case and screen protector."
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 options:
 *                   type: object
 *                   example: { "color": "black", "memory": "64GB" }
 *                 color:
 *                   type: string
 *                   example: "black"
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

prodcustRoute.put('/:id', authenticate, authorize('admin'), productController.updateProduct);

/**
 * @swagger
 * /product/{id}:
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

prodcustRoute.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

module.exports = prodcustRoute;
