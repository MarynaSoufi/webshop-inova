import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class ProductHasTags extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	ProductHasTags.init({
		// tag_id: {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
    // 	primaryKey: true,
		// 	allowNull: false
		// },
		tag_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'ProductHasTags',
		tableName: 'ProductsHasTags',
	});
	
	return ProductHasTags;
}
