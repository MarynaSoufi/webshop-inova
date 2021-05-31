import { Sequelize } from 'sequelize';
import loadProduct from '../models/product.model.js';
import loadCategory from '../models/category.model.js';
import loadPromo from '../models/promo.model.js';
import loadTag from '../models/tags.model.js';
import loadReview from '../models/review.model.js';


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

	
  database.Promo = loadPromo(sequelize);
  database.Promo.associate(database);

  database.Product = loadProduct(sequelize);
  database.Product.associate(database);
  
  database.Category = loadCategory(sequelize);
  database.Category.associate(database);
 
  database.Tag = loadTag(sequelize);
  database.Tag.associate(database);

  database.Review = loadReview(sequelize);
  database.Review.associate(database);


	// Sync all models with the database
	// await database.sequelize.sync();
};

export default database;
