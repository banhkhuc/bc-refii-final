import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import jwt from 'jsonwebtoken';
import config from '../config';
import ResponeCodes from 'utils/constants/ResponeCode';
import User, { UserModel } from 'databases/models/User';
import { Facility } from 'databases/models';
import FacilityType from 'utils/constants/FacilityType';

interface IToken {
	userId: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	// const token = (req.headers['x-access-token'] || req.headers['authorization']) as string;
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return new ApiResponse(null, 'No token provided!', ResponeCodes.UNAUTHORIZED).send(res);
	}

	jwt.verify(token, config.secret_key, async (err: Error, decoded: IToken) => {
		if (err) {
			return new ApiResponse(err, 'Unauthorized!', ResponeCodes.UNAUTHORIZED).send(res);
		}

		req.user = await User.findByPk(decoded.userId, {
			include: Facility
		});

		if (!req.user) {
			return new ApiResponse(err, 'Unauthorized!', ResponeCodes.UNAUTHORIZED).send(res);
		}
		next();
	});
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserModel = req.user;
	const facilityType = user.Facility.type;

	if (facilityType !== FacilityType.ADMIN) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

const verifyProduce = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserModel = req.user;
	const facilityType = user.Facility.type;

	if (facilityType !== FacilityType.PRODUCE) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

const verifyDistribute = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserModel = req.user;
	const facilityType = user.Facility.type;

	if (facilityType !== FacilityType.DISTRIBUTE) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

const verifyGuarantee = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserModel = req.user;
	const facilityType = user.Facility.type;

	if (facilityType !== FacilityType.GUARANTEE) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

export { verifyToken, verifyAdmin, verifyProduce, verifyDistribute, verifyGuarantee };
