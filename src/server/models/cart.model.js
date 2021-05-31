import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Cart extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	Cart.init({
		cart_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		user_id: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'Cart',
		tableName: 'Cart',
	});
	
	return Cart;
}
