import { Model, DataTypes } from 'sequelize';

class Category extends Model {
	static associate(models) {
		this.hasMany(models.Product);
	}
}

Category.init({
	category_id: DataTypes.INTEGER,
	name: DataTypes.STRING,
	created_at: DataTypes.DATE,
	updated_at: DataTypes.DATE
}, {
	sequelize,
	modelName: 'Category',
	tableName: 'Categories'
});

export default Category;
