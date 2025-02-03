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

   // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
  public async matchPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
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
          allowNull: false,
		  unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
		  unique: true
        }
      },
      {
        tableName: 'users',
        sequelize,
        hooks: {
          beforeCreate: async (user: User) => {
            await user.setPassword(user.password);
          },
          beforeUpdate: async (user: User) => {
            await user.setPassword(user.password);
          },
        }
      }
    )
    return User;
}
