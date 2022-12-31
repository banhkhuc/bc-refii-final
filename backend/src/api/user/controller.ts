import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

// GET: /users/pagination
const getUsers = async (req: Request, res: Response) => {
	try {
		const result = await service.getUsers(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get users.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /users/:id
const getUser = async (req: Request, res: Response) => {
	try {
		const result = await service.getUserById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get user.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /users/me
const getMe = async (req: Request, res: Response) => {
	try {
		const result = await service.getMe(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get info.", ResponeCodes.ERROR).send(res);
	}
};

// PUT: /users/change-info
const changeInfo = async (req: Request, res: Response) => {
	try {
		const result = await service.changeInfo(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update info.", ResponeCodes.ERROR).send(res);
	}
};

// PUT: /users/change-facility-info
const changeFacilityInfo = async (req: Request, res: Response) => {
	try {
		const result = await service.changeFacilityInfo(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update info.", ResponeCodes.ERROR).send(res);
	}
};

// PUT: /users/change-password
const changePassword = async (req: Request, res: Response) => {
	try {
		const checkResult = await service.checkNewPassword(req);
		if (checkResult.data) {
			const changeResult = await service.changePassword(req);
			return new ApiResponse(changeResult.data, changeResult.message, changeResult.status).send(res);
		} else {
			return new ApiResponse(checkResult.data, checkResult.message, checkResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't change password.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /users/verify-password
const verifyPassword = async (req: Request, res: Response) => {
	try {
		const result = await service.verifyPassword(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't verify password.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /users/:id
const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteUser(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete user.", ResponeCodes.ERROR).send(res);
	}
};

export { getUsers, getUser, deleteUser, changeInfo, changeFacilityInfo, changePassword, verifyPassword, getMe };
