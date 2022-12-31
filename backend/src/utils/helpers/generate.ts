import config from 'config';
import { Product, User } from 'databases/models';
import jwt from 'jsonwebtoken';
import { addTimeByMinute } from './timeService';

const generateAccount = async () => {
	let idmx: number = (await User.max('id')) || 0;
	const idx = (++idmx).toString().padStart(6, '0');
	return 'BC' + idx;
};

const generatePassword = () => {
	return Math.random().toString(36).slice(-8);
};

const generateCode = () => {
	const code = `${Math.floor(100000 + Math.random() * 900000)}`;
	const expires = addTimeByMinute(new Date(Date.now()), 30);
	return {
		code,
		expires
	};
};

const generateToken = (userId: number) => {
	const token = jwt.sign({ userId }, config.secret_key, {
		expiresIn: config.expires_in
	});
	return token;
};

const generateProductCode = async (productLineModel: string) => {
	let idx: number = await Product.max('id', {
		where: {
			productLineModel
		}
	});
	return productLineModel + `-${++idx}`;
};

export { generateAccount, generatePassword, generateCode, generateToken, generateProductCode };
