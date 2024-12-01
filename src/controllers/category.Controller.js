const Category = require('../models/category.Model');

const categoryController = {
    addCategory: async (req, res) => {
        try {
            const { name, description, image, status } = req.body;
            const category = await Category.create({ name, description, image, status });
            res.status(201).json({ status: true, message: "Category added successfully.", category });
        } catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const { id } = req.query;

            if (id) {
                const data = await Category.findByPk(id);
                if (!data) {
                    return res.status(404).json({ status: false, error: "Category not found" });
                }
                const category = data.dataValues;
                category.image = `${req.protocol}://${req.get('host')}${category.image}`;
                return res.status(200).json({ status: true, category });
            } else {
                const categories = await Category.findAll();
                const categoriesData = categories.map(category => {
                    const categoryData = category.dataValues;
                    categoryData.image = `${req.protocol}://${req.get('host')}${categoryData.image}`;
                    return categoryData;
                });
                return res.status(200).json({ status: true, categories: categoriesData });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, description, image, status } = req.body;
            const category = await Category.findByPk(id);
            if (!category) {
                res.status(404).json({ status: false, error: "Category not found" });
            }
            await Category.update({ name, description, image, status }, { where: { id } });
            res.status(200).json({ status: true, message: "Category updated successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findByPk(id);
            if (!category) {
                res.status(404).json({ status: false, error: "Category not found" });
            }
            await Category.destroy({ where: { id } });
            res.status(200).json({ status: true, message: "Category deleted successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    }
}

module.exports = categoryController;