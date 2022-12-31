import bcrypt from 'bcrypt';
import { Facility, User } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import { generateAccount, generatePassword, generateToken } from 'utils/helpers/generate';
import { sendRegisterEmail } from 'utils/helpers/email';
import sequelize from 'databases';
import { CreatePayload, LoginPayLoad } from 'utils/payload';

const verifyAccount = async (account: string) => {
	const user = await User.findOne({
		where: {
			account
		},
		include: Facility
	});
	return user;
};

const verifyEmail = async (email: string) => {
	const user = await User.findOne({
		where: {
			email
		}
	});
	return user;
};

const createAccount = async (createData: CreatePayload) => {
	const transaction = await sequelize.transaction();
	try {
		const { email, facility } = createData;
		if (!email || !facility) {
			return {
				message: 'Invalid payload.',
				status: ResponeCodes.BAD_REQUEST
			};
		} else {
			const verify = await verifyEmail(email);
			if (!verify) {
				const password = generatePassword();
				const hashPassword = bcrypt.hashSync(password, 10);
				const account = await generateAccount();

				const user = await User.create(
					{
						...createData,
						password: hashPassword,
						account
					},
					{ transaction }
				);
				await user.setFacility(facility, { transaction });
				await transaction.commit();
				sendRegisterEmail(email, account, password);
				const token = generateToken(user.id);

				return {
					data: {
						user,
						token
					},
					message: 'Create successfully!',
					status: ResponeCodes.OK
				};
			} else {
				return {
					message: 'Email exsist.',
					status: ResponeCodes.BAD_REQUEST
				};
			}
		}
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
};

const login = async (loginData: LoginPayLoad) => {
	try {
		const { account, password } = loginData;

		if (!account || !password) {
			return {
				message: 'Invalid account or password.',
				status: ResponeCodes.BAD_REQUEST
			};
		} else {
			const user = await verifyAccount(account);

			if (user) {
				const verifyPassword = bcrypt.compareSync(password, user.password);
				if (!verifyPassword) {
					return {
						message: 'Wrong password!',
						status: ResponeCodes.OK
					};
				} else {
					const token = generateToken(user.id);
					return {
						data: {
							user,
							token
						},
						message: 'Login successfully!',
						status: ResponeCodes.OK
					};
				}
			} else {
				return {
					message: 'Account not exsist.',
					status: ResponeCodes.NOT_FOUND
				};
			}
		}
	} catch (error) {
		throw error;
	}
};

export { createAccount, login };
