import {
  Model,
  DataTypes,
  Optional,
  Association,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../util/instance";
import Cart from "./Cart";

interface IUser {
  id: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
  token: string;
  imgType: string;
  imgName: string;
}

interface UserCreationAttributes extends Optional<IUser, "id"> {}

export default class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser {
  public id!: number;
  public fName!: string;
  public lName!: string;
  public email!: string;
  public password!: string;
  public token!: string;
  public imgType!: string;
  public imgName!: string;

  public addToCart!: HasManyAddAssociationMixin<Cart, number>;
  public getCart!: HasManyGetAssociationsMixin<Cart>;

  public readonly carts?: Cart[];

  public static associations: {
    carts: Association<User, Cart>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING(50),
    token: DataTypes.STRING,
    imgType: DataTypes.STRING,
    imgName: DataTypes.STRING
  },
  { sequelize, tableName: "users" }
);

User.hasMany(Cart, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "carts",
});
