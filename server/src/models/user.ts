import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import bcrypt from 'bcrypt';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        tableName: 'users',
        sequelize,
        hooks: {
          beforeCreate: async (newUser: User) => {
            console.log('encrypting password')
            newUser.password = await bcrypt.hash(newUser.password, 10)
          },
          beforeUpdate: async (user: User) => {
            user.password = await bcrypt.hash(user.password, 10)
          }
        }
      }
    )
    return User;
}
