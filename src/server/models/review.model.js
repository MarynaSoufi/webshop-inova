import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Review extends Model {
		static associate(models) {
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	Review.init({
		review_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    description: DataTypes.TEXT,
		updated_at: DataTypes.DATE
    
	}, {
		sequelize,
		modelName: 'Review',
		tableName: 'Reviews',
    updatedAt: 'updated_at',
  	createdAt: 'created_at'
	});
	
	return 	Review;
}
