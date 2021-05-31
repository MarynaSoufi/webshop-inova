import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Profile extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	Profile.init({
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    addressLine: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'Profile',
		tableName: 'Profiles',
	});
	
	return Profile;
}
