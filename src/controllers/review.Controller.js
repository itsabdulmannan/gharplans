const reviewModel = require('../models/review.Model');
const User = require('../models/user.Model');
const Products = require('../models/prodcust.Model');
const Category = require('../models/category.Model');

const reviewController = {
    addReview: async (req, res) => {
        try {
            const { userId, productId, rating, review } = req.body;
            const addedReview = await reviewModel.create({ userId, productId, rating, review });
            res.status(201).json({ status: true, message: "Review added successfully.", addedReview });
        } catch (error) {
            console.error("Error while adding review", error);
            res.status(500).json({ status: false, message: "Internal server error." });
        }
    },
    getReviews: async (req, res) => {
        try {
            const { id, userId } = req.query;
            let whereCondition = {};
            if (id) whereCondition.id = id;
            if (userId) whereCondition.userId = userId;
            const reviews = await reviewModel.findAll({
                where: whereCondition,
                attributes: ['id', 'rating', 'review', 'status', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                },
                {
                    model: Products,
                    attributes: ['name'],
                    include: [{
                        model: Category,
                        attributes: ['name']
                    }]
                }]
            });

            const response = reviews.map(review => {
                const reviewData = review.toJSON();
                delete reviewData.userId;
                delete reviewData.productId;
                return reviewData;
            });

            res.status(200).json({ status: true, message: "Reviews fetched successfully", data: response });
        } catch (error) {
            console.error("Error while fetching reviews", error);
            res.status(500).json({ status: false, message: "Internal server error." });
        }
    },
    updateReview: async (req, res) => {
        try {
            const { reviewId, userId, status } = req.body;
            if (!reviewId || !userId || !status) {
                return res.status(400).json({ status: false, message: "Missing required fields." });
            }
            const updatedReview = await reviewModel.update(
                { status },
                { where: { id: reviewId, userId } }
            );
            res.status(200).json({
                status: true,
                message: "Review updated successfully.",
                updatedReview,
            });
        } catch (error) {
            console.error("Error while updating review", error);
            res.status(500).json({ status: false, message: "Internal server error." });
        }
    },
}
module.exports = reviewController;