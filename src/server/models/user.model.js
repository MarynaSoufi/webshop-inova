import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	User.init({
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		email: DataTypes.STRING,
		password: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'User',
		tableName: 'Users',
	});
	
	return Product;
}
