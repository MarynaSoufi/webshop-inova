import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class WishList extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	WishList.init({
		list_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		user_id: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'WishList',
		tableName: 'WishList',
	});
	
	return Product;
}
