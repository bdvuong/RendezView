import Group from "../models/Group.js";
import User from "../models/User.js";
import { request, response } from "express";
import { ObjectId } from "mongodb"; // Import your Mongoose Group model

export const getGroupList = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.session.user });

        let groupArr = [];

        for (let groupID of user.groups) {
            let group = await Group.findOne({ _id: groupID });
            if (group) groupArr.push(group);
        }
        response.status(200).json(groupArr);
    } catch (error) {
        console.error("An error occurred while fetching groups:", error);
        response.status(500).end();
    }
};

export const createGroup = async (request, response) => {
    const { name, description, users } = request.body;

    try {
        // Create a new group using Mongoose model
        const newGroup = new Group({
            name,
            description,
            users
        });

        let r = await newGroup.save();

        response.status(200).end(JSON.stringify({ _id: r._id }));
    } catch (error) {
        console.error("An error occurred while adding a group:", error);
        response.status(500).end();
    }
};

export const deleteGroup = async (request, response) => {
    const groupId = request.params.id;
    try {
        const deletedGroup = await Group.findByIdAndDelete(groupId);

        if (deletedGroup) {
            response
                .status(200)
                .json({ message: "Group deleted successfully" });
        } else {
            response.status(404).json({ message: "Group not found" });
        }
    } catch (error) {
        console.error("An error occurred while deleting a group:", error);
        response.status(500).end();
    }
};

export const getUserByUsername = async (request, response) => {
    const user = request.params.username;

    const foundUser = await User.findOne({ username: user });

    if (foundUser) {
        response.status(200).end();
    } else {
        response.status(404).end();
    }
};

export const userGroupRef = async (request, response) => {
    let username = request.body.user;
    let groupRef = request.body.groupID;

    const user = await User.findOne({ username: username });
    let userGroups = user.groups;
    userGroups.push(new ObjectId(groupRef));
    await user.updateOne({ groups: userGroups });

    response.status(200).end();
};