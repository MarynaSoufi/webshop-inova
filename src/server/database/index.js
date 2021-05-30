import { Sequelize } from 'sequelize';
import loadProduct from '../models/product.model.js';

const sequelize = new Sequelize({
  username: 'root',
  password: null,
  dialect: 'sqlite',
  host: '127.0.0.1',
  storage: './src/server/db/inova.sqlite3',
  database: 'inova'
});

const database = {};

database.connect = async () => {
  database.sequelize = sequelize;
	database.Sequelize = Sequelize;

	database.Product = loadProduct(sequelize);
  database.Product.associate(database);

	// Sync all models with the database
	//await database.sequelize.sync();
};

export default database;
