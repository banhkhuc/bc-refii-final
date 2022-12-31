import bcrypt from 'bcrypt';
import {
	BelongsToSetAssociationMixin,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import Facility, { FacilityModel } from './Facility';

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	// Some fields are optional when calling UserModel.create() or UserModel.build(	)
	id: CreationOptional<number>;
	account: string;
	password: string;
	fullName: string;
	email: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	Facility?: NonAttribute<FacilityModel>;

	setFacility: BelongsToSetAssociationMixin<FacilityModel, FacilityModel['id']>;
}

const User = sequelize.define<UserModel>(
	'User',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		account: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		fullName: {
			type: DataTypes.STRING
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'user',
		underscored: true
	}
);

Facility.hasMany(User);
User.belongsTo(Facility);

export default User;
