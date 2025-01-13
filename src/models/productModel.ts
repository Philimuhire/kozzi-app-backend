import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Product extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public category!: string;
  public quantity!: number;
  public price!: number; // Add price field
  public status!: string;
  public image_url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: { 
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'available',
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  }
);

export default Product;
