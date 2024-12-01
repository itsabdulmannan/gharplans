const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/review.Controller');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing product reviews.
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a new review.
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user adding the review.
 *               productId:
 *                 type: integer
 *                 description: ID of the product being reviewed.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating for the product (e.g., 4.5).
 *               review:
 *                 type: string
 *                 description: Review text for the product.
 *             required:
 *               - userId
 *               - productId
 *               - rating
 *               - review
 *     responses:
 *       201:
 *         description: Review added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 addedReview:
 *                   type: object
 *       500:
 *         description: Internal server error.
 */
reviewRouter.post('/', authenticate, authorize('User'), reviewController.addReview);
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews or filter by userId or id.
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter reviews by user ID.
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter reviews by review ID.
 *     responses:
 *       200:
 *         description: Reviews fetched successfully.
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       productId:
 *                         type: integer
 *                       rating:
 *                         type: number
 *                         format: float
 *                       review:
 *                         type: string
 *       500:
 *         description: Internal server error.
 */
reviewRouter.get('/', authenticate, authorize('admin', 'User'), reviewController.getReviews);

/**
 * @swagger
 * /reviews:
 *   put:
 *     summary: Update the status of a review.
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: integer
 *                 description: ID of the review to update.
 *               userId:
 *                 type: integer
 *                 description: ID of the user making the update.
 *               status:
 *                 type: string
 *                 description: New status of the review.
 *                 enum: 
 *                   - pending
 *                   - approved
 *                   - rejected
 *             required:
 *               - reviewId
 *               - userId
 *               - status
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 updatedReview:
 *                   type: object
 *       500:
 *         description: Internal server error.
 */

reviewRouter.put('/', authenticate, authorize('admin'), reviewController.updateReview);

module.exports = reviewRouter;