import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Tag extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	Tag.init({
		tag_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		name: DataTypes.STRING,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Tag',
		tableName: 'Tags',
		updatedAt: 'updated_at',
  	createdAt: 'created_at'
	});
	
	return Tag;
}
