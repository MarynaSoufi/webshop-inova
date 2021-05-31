import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class CartHasProducts extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	CartHasProducts.init({
		// product_id: {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
    // 	primaryKey: true,
		// 	allowNull: false
		// },
		list_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
	
	}, {
		sequelize,
		modelName: 'CartHasProducts',
		tableName: 'CartHasProducts',
	});
	
	return CartHasProducts;
}
