const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: true,
    timezone: '+00:00',
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize.sync({ force: false, alter: true }).then(() => {
    console.log('Database & tables created!');
}).catch((error) => {
    console.error('Unable to create database & tables:', error);
})

module.exports = sequelize;