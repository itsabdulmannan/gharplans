const utmRouter = require('express').Router();
const utmController = require('../controllers/utm.Controller');

/**
   * @swagger
   * /utm/create:
   *   post:
   *     summary: Generate a UTM link.
   *     description: Creates a UTM link based on the provided parameters and stores it in the database.
   *     tags:
   *       - UTM Links
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               baseUrl:
   *                 type: string
   *                 description: The base URL of your website or landing page.
   *               source:
   *                 type: string
   *                 description: The specific source of traffic (e.g., facebook, instagram).
   *               medium:
   *                 type: string
   *                 description: The marketing medium (e.g., social, email, influencer).
   *               campaign:
   *                 type: string
   *                 description: The name of the campaign (e.g., holiday_sale).
   *               couponCode:
   *                 type: string
   *                 description: A unique coupon or promotional code (optional).
   *             required:
   *               - baseUrl
   *               - source
   *               - medium
   *               - campaign
   *     responses:
   *       201:
   *         description: UTM link generated successfully.
   *       500:
   *         description: Internal server error.
   */
utmRouter.post('/create', utmController.createUtm);

/**
    * @swagger
    * /utm:
    *   get:
    *     summary: Retrieve UTM links.
    *     description: Fetch UTM links based on query parameters, with optional pagination.
    *     tags:
    *       - UTM Links
    *     parameters:
    *       - in: query
    *         name: id
    *         schema:
    *           type: integer
    *         description: Filter by UTM ID.
    *       - in: query
    *         name: source
    *         schema:
    *           type: string
    *         description: Filter by traffic source (e.g., facebook, instagram).
    *       - in: query
    *         name: couponCode
    *         schema:
    *           type: string
    *         description: Filter by coupon code.
    *       - in: query
    *         name: offset
    *         schema:
    *           type: integer
    *         description: The offset for pagination (default is 0).
    *       - in: query
    *         name: limit
    *         schema:
    *           type: integer
    *         description: The number of records to retrieve (default is 10).
    *     responses:
    *       200:
    *         description: Successfully retrieved UTM links.
    *       500:
    *         description: Internal server error.
    */
utmRouter.get('/', utmController.getUtm);

module.exports = utmRouter;