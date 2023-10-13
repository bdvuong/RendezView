import Group from "../models/Group.js";
import User from "../models/User.js";

export const getSoloAvailability = async (request, response) => {
    const userId = request.params.id;
    const user = await User.findOne({ _id: userId });
    const availability = user.availability;
    response.status(200).json(availability);
}

export const updateSoloAvailability = async (request, response) => {
    const userId = request.params.id;
    const newAvailability = request.body.newAvailability;
    const user = await User.findOne({ _id: userId });
    await user.updateOne({ availability: newAvailability });
    response.status(200).end();
}

export const getGroupAvailability = async (request, response) => {
    const groupId = request.params.id;
    const group = await Group.findOne({ _id: groupId });
    const availability = group.availability;
    response.status(200).json(availability);
}

export const updateGroupAvailability = async (request, response) => {
    const groupId = request.params.id;
    const newAvailability = request.body.newAvailability;
    const group = await Group.findOne({ _id: groupId });
    await group.updateOne({ availability: newAvailability });
    response.status(200).end();
}
