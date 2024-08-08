// Justin Lombardi
// August 8th, 2024
// Version 2.0

//Require the express module and require the auth and custom_error files to handle tokens and errors in validation
const express = require("express");
const { requireToken } = require("../db/middleware/auth");
const { handleValidateOwnership } = require("../db/middleware/custom_errors");

//Import the event model
const Event = require("../db/models/Event");

//Instantiate a router
const router = express.Router();

//Get all events
router.get("/", async (req, res, next) => {
	try {
		const events = await Event.find({}).populate("owner");
		res.json(events);
	} catch (error) {
		next(error);
	}
});

// Get events filtered by category
// http://localhost:3001/api/events/category
router.get("/category/:category", async (req, res, next) => {
	try {
		const events = await Event.find({
			category: `${req.params.category}`,
		}).populate("owner");
		res.json(events);
	} catch (error) {
		next(error);
	}
});

// get one event by id
// http://localhost:3001/api/events/id
router.get("/id/:id", async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id);
		if (event) {
			res.json(event);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// get event by user's name
router.get("/username/:username", async (req, res, next) => {
	try {
		console.log(req.params.username);
		const name = await Event.find({
			owner: { username: `${req.params.username}` },
		});
		res.json(name);
	} catch (error) {
		next(error);
	}
});

//create a event
// http://localhost:3001/api/events
router.post("/", requireToken, async (req, res, next) => {
	try {
		const newEvent = await Event.create({ ...req.body, owner: req.user._id });
		res.status(201).json(newEvent);
	} catch (error) {
		next(error);
	}
});

// update an event
// http://localhost:3001/api/events/id
router.put("/id/:id", requireToken, async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id);
		if (event) {
			handleValidateOwnership(req, event);
			const eventToUpdate = await Event.findByIdAndUpdate(
				req.params.id,
				{ ...req.body, owner: req.user._id },
				{
					new: true,
				}
			);
			res.json(eventToUpdate);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Update: Partially edit an event
// http://localhost:3001/api/events/id
router.patch("/id/:id", requireToken, async (req, res, next) => {
	console.log(req.body);
	try {
		const event = await Event.findById(req.params.id);
		if (event) {
			handleValidateOwnership(req, event);
			const eventToUpdate = await Event.findByIdAndUpdate(
				req.params.id,
				// partially update the document with the request body's fields
				{ $set: req.body },
				{ new: true }
			).populate("owner");
			res.json(eventToUpdate);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Delete: Remove a event
// http://localhost:3001/api/events/id
router.delete("/id/:id", requireToken, async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id);
		if (event) {
			handleValidateOwnership(req, event);
			const deletedEvent = await Event.findOneAndDelete({
				_id: req.params.id,
			});
			if (deletedEvent) {
				res.json(deletedEvent);
			} else {
				res.sendStatus(404);
			}
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
