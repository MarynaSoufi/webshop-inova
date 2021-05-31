import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class WishListHasProducts extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	WishListHasProducts.init({
		// product_id: {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
    // 	primaryKey: true,
		// 	allowNull: false
		// },
		cart_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
	
	}, {
		sequelize,
		modelName: 'WishListHasProducts',
		tableName: 'WishListHasProducts',
	});
	
	return Product;
}
