import { Request, Response } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

// POST: /create
const createAccount = async (req: Request, res: Response) => {
	try {
		const result = await service.createAccount(req.body);
		return new ApiResponse(result.data, result.message, result.status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't create account.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /login
const login = async (req: Request, res: Response) => {
	try {
		const result = await service.login(req.body);
		return new ApiResponse(result.data, result.message, result.status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't login.", ResponeCodes.ERROR).send(res);
	}
};

export { createAccount, login};
