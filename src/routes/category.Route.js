const categoryController = require('../controllers/category.Controller');
const categoryRoute = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Add a new category
 *     description: Adds a new category to the system.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: A short description of the category.
 *                 example: "Gadgets and devices"
 *               image:
 *                 type: string
 *                 description: URL to the category image.
 *                 example: "https://example.com/electronics.jpg"
 *               status:
 *                 type: string
 *                 description: The status of the category (e.g., active, inactive).
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Category added successfully
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
 *                   example: "Category added successfully."
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *                     description:
 *                       type: string
 *                       example: "Gadgets and devices"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/electronics.jpg"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */
categoryRoute.post('/', authenticate, authorize('admin'), categoryController.addCategory);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Retrieve categories by ID, name, or product name
 *     description: Fetch a category by its unique ID, search categories by name or associated product name, or fetch all categories if no filters are provided.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: The ID of the category to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: categoryName
 *         required: false
 *         description: The name or partial name of the category to search for.
 *         schema:
 *           type: string
 *           example: "Electronics"
 *       - in: query
 *         name: productName
 *         required: false
 *         description: The name or partial name of a product associated with the category to search for.
 *         schema:
 *           type: string
 *           example: "Smartphone"
 *     responses:
 *       200:
 *         description: A single category's details, a list of matching categories, or all categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *                     description:
 *                       type: string
 *                       example: "Gadgets and devices"
 *                     image:
 *                       type: string
 *                       example: "http://localhost:3000/images/1732819064781-Screenshot 2024-05-18 142049.png"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-28T18:38:56.541Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-28T18:38:56.541Z"
 *                     Products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Smartphone"
 *                           price:
 *                             type: number
 *                             example: 599.99
 *                           description:
 *                             type: string
 *                             example: "High-end smartphone with 128GB storage"
 *                           image:
 *                             type: string
 *                             example: "http://localhost:3000/images/product-1.png"
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Electronics"
 *                       description:
 *                         type: string
 *                         example: "Gadgets and devices"
 *                       image:
 *                         type: string
 *                         example: "http://localhost:3000/images/1732819064781-Screenshot 2024-05-18 142049.png"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-28T18:38:56.541Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-28T18:38:56.541Z"
 *                       Products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Smartphone"
 *                             price:
 *                               type: number
 *                               example: 599.99
 *                             description:
 *                               type: string
 *                               example: "High-end smartphone with 128GB storage"
 *                             image:
 *                               type: string
 *                               example: "http://localhost:3000/images/product-1.png"
 *       404:
 *         description: Category not found.
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
 *                   example: "Category not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */

categoryRoute.get('/', categoryController.getCategoryByIdAndName);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update an existing category
 *     description: Updates a category's details by its ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to be updated.
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
 *                 description: The name of the category.
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: A short description of the category.
 *                 example: "Gadgets and devices"
 *               image:
 *                 type: string
 *                 description: URL to the category image.
 *                 example: "/images/1732819064781-Screenshot 2024-05-18 142049.png"
 *               status:
 *                 type: string
 *                 description: The status of the category (e.g., active, inactive).
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Category updated successfully.
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
 *                   example: "Category updated successfully."
 *       404:
 *         description: Category not found.
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
 *                   example: "Category not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */
categoryRoute.put('/:id', authenticate, authorize('admin'), categoryController.updateCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Deletes a category from the database by its unique ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category deleted successfully.
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
 *                   example: "Category deleted successfully."
 *       404:
 *         description: Category not found.
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
 *                   example: "Category not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */
categoryRoute.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

module.exports = categoryRoute;