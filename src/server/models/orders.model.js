import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Order extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	Order.init({
		order_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		user_id: DataTypes.INTEGER,
		category_id: DataTypes.INTEGER,
		status: DataTypes.STRING,
		date: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Order',
		tableName: 'Orders',
	});
	
	return Product;
}
