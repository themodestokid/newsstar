import { Model, Optional, Sequelize } from "sequelize";


interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  id!: number;
  username!: string;
  password!: string;
  email!: string;
  created_at!: Date;
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            
        }
    )
}
