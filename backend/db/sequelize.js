import { Sequelize } from 'sequelize';

// Create Sequelize instance
const sequelize = new Sequelize('x_database', 'root', 'qwe123!', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

// Test connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;
