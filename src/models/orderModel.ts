import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Order extends Model {
  public id!: string;
  public userId!: string;
  public totalAmount!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id', 
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true, 
  }
);

export default Order;
