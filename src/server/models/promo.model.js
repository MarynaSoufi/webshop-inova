import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Promo extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	Promo.init({
		promo_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		name: DataTypes.STRING,
    percent: DataTypes.INTEGER,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Promo',
		tableName: 'Promo',
		updatedAt: 'updated_at',
  	createdAt: 'created_at'
	});
	
	return Promo;
}
