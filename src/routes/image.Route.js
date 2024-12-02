const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const uploadImage = require('../controllers/image.Controller');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /image/upload-image:
 *   post:
 *     summary: Upload an image
 *     description: This endpoint allows the user to upload an image and get the URL of the uploaded image.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 imageUrl:
 *                   type: string
 *                   example: http://localhost:3000/images/1681222234-profile.jpg
 *       400:
 *         description: Invalid file type or size
 */
router.post('/upload-image', upload.single('image'), authenticate, authorize('admin'), uploadImage);

module.exports = router;
