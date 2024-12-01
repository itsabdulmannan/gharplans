const Products = require('./prodcust.Model');
const Category = require('./category.Model');
const Review = require('./review.Model');
const User = require('./user.Model');
const cart = require('./cart.Model');
const Order = require('./order.Model');

Products.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Products, { foreignKey: 'categoryId' });

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Products, { foreignKey: 'productId' });

cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
cart.belongsTo(Products, { foreignKey: 'productId', as: 'product' });
User.hasMany(cart, { foreignKey: 'userId', as: 'carts' });
Products.hasMany(cart, { foreignKey: 'productId', as: 'carts' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.belongsToMany(Products, { through: 'OrderItem', foreignKey: 'orderId' });
Products.belongsToMany(Order, { through: 'OrderItem', foreignKey: 'productId' });
