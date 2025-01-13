import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Payment extends Model {
  public id!: string;
  public orderId!: string;
  public userId!: string;
  public amount!: number;
  public transactionId!: string;
  public status!: string;
  public paymentDate!: Date;
  public phoneNumber!: string; // New field to store phone number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending', 
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phoneNumber: {  // New field for phone number
      type: DataTypes.STRING,
      allowNull: false, // Ensure phone number is provided for notifications
    }
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
  }
);

export default Payment;
