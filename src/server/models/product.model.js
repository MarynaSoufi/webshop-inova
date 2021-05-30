import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	Product.init({
		product_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		promo_id: DataTypes.INTEGER,
		category_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		price: DataTypes.FLOAT,
		image: DataTypes.STRING,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Product',
		tableName: 'Products',
		updatedAt: 'updated_at',
  	createdAt: 'created_at'
	});
	
	return Product;
}
