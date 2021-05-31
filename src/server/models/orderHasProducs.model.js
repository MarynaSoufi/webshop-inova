import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class OrderHasProducts extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	OrderHasProducts.init({
		// product_id: {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
    // 	primaryKey: true,
		// 	allowNull: false
		// },
		order_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
	
	}, {
		sequelize,
		modelName: 'OrderHasProducts',
		tableName: 'OrderHasProducts',
	});
	
	return OrderHasProducts;
}
