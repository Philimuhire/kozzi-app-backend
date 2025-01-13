import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class OrderItem extends Model {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'order_id',
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: true,
  }
);

export default OrderItem;
