const Products = require('../models/prodcust.Model');
const Category = require('../models/category.Model');
const { Op } = require('sequelize');
const Review = require('../models/review.Model');
const sequelize = require('../config/database');

const productController = {
    getProducts: async (req, res) => {
        try {
            const { id } = req.query;

            if (id) {
                const product = await Products.findOne({
                    where: { id },
                    include: {
                        model: Category,
                        attributes: ['id', 'name'],
                    },
                });

                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }

                // Calculate the average rating for the product
                const reviews = await Review.findAll({
                    where: { productId: id, status: 'approved' }, // Only approved reviews
                    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'averageRating']],
                });

                const averageRating = reviews.length > 0 ? reviews[0].get('averageRating') : 0;

                const host = req.protocol + '://' + req.get('host');
                const productJson = product.toJSON();
                const result = {
                    ...productJson,
                    category: {
                        categoryId: product.category.id,
                        name: product.category.name,
                    },
                    image: host + productJson.image,
                    rating: averageRating, // Add the calculated average rating
                };

                delete result.categoryId;
                delete result.createdAt;
                delete result.updatedAt;

                return res.status(200).json(result);
            }

            const products = await Products.findAll({
                include: {
                    model: Category,
                    attributes: ['id', 'name'],
                },
            });

            const host = req.protocol + '://' + req.get('host');

            const result = await Promise.all(products.map(async (product) => {
                const productJson = product.toJSON();

                // Calculate the average rating for each product
                const reviews = await Review.findAll({
                    where: { productId: product.id, status: 'approved' }, // Only approved reviews
                    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'averageRating']],
                });

                const averageRating = reviews.length > 0 ? reviews[0].get('averageRating') : 0;

                return {
                    ...productJson,
                    category: {
                        categoryId: product.category.id,
                        name: product.category.name,
                    },
                    image: host + productJson.image,
                    rating: averageRating, // Add the calculated average rating
                };
            }));

            result.forEach(product => {
                delete product.categoryId;
                delete product.createdAt;
                delete product.updatedAt;
            });

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            console.log(req.body)
            const product = await Products.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Products.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            await product.update(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Products.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productController;