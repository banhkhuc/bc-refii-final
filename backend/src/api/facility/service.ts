import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import { Facility, User } from 'databases/models';
import { FacilityModel } from 'databases/models/Facility';
import FacilityType from 'utils/constants/FacilityType';
import { FacilityPayload } from 'utils/payload';

const getFacilities = async (req: Request) => {
	try {
		const { offset, limit, order, query } = paginate(req);

		const facilities = await Facility.findAndCountAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${query}%`
						}
					}
				]
			},
			include: User,
			offset,
			limit,
			order: [order]
		});

		return facilities;
	} catch (error) {
		throw error;
	}
};

const getAllFacilities = async (req: Request) => {
	try {
		const type = req.query.type;
		let whereFacility = {};
		if (type === FacilityType.PRODUCE || type === FacilityType.DISTRIBUTE || type === FacilityType.GUARANTEE) {
			whereFacility = {
				type
			};
		}
		const facilities = await Facility.findAll({
			where: whereFacility
		});
		return facilities;
	} catch (error) {
		throw error;
	}
};

const getFacilityById = async (req: Request) => {
	try {
		let data: FacilityModel;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const facility = await Facility.findByPk(id, {
				include: User
			});
			if (!facility) {
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = facility;
				message = 'Get successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const addFacility = async (req: Request) => {
	try {
		let data: FacilityModel;
		let message: string;
		let status: number;

		const newFacility: FacilityPayload = req.body;

		if (
			!newFacility.name ||
			(newFacility.type !== FacilityType.PRODUCE &&
				newFacility.type !== FacilityType.DISTRIBUTE &&
				newFacility.type !== FacilityType.GUARANTEE)
		) {
			message = 'Invalid payload.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const [facility, created] = await Facility.findOrCreate({
				where: {
					address: newFacility.address
				},
				defaults: {
					...newFacility
				}
			});

			if (created) {
				data = facility;
				message = 'Add successfully!';
				status = ResponeCodes.CREATED;
			} else {
				message = 'Facility exists.';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const deleteFacility = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			await Facility.destroy({
				where: {
					id
				}
			});
			message = 'Deleted successfully!';
			status = ResponeCodes.OK;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { getFacilities, getAllFacilities, getFacilityById, addFacility, deleteFacility };
