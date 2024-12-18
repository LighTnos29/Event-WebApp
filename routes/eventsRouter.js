const express = require("express");
const router = express.Router();
const eventModel = require("../models/eventModel");
const roleCheck = require("../middlewares/roleChecker");
const isLoggedIn = require('../middlewares/isLoggedin')

router.post('/create',isLoggedIn,roleCheck("event manager"), async function (req, res){
    try {
        const { title, description, location, date, category } = req.body;
        const createdEvent = await eventModel.create({
            title,
            description,
            location,
            date,
            category,
            organizer: req.user._id,
            attendees: []
        });
        
        res.status(201).send(createdEvent);
    } catch (error) {
        res.status(500).send({ message: "Error creating event", error });
    }
});

router.put('/update/:id', roleCheck('event manager'),isLoggedIn, async function(req, res){
    try {
        const eventId = req.params.id;
        const updateData = req.body;

        const updatedEvent = await eventModel.findByIdAndUpdate(eventId, updateData, { new: true });
        
        if (!updatedEvent) {
            return res.status(404).send({ message: 'Event not found' });
        }
        
        res.status(200).send(updatedEvent);
    } catch (error) {
        res.status(500).send({ message: "Error updating event", error });
    }
});

router.delete('/delete/:id', roleCheck('admin'),isLoggedIn, async function(req, res){
    try {
        const eventId = req.params.id;

        const deletedEvent = await eventModel.findByIdAndDelete(eventId);
        
        if (!deletedEvent) {
            return res.status(404).send({ message: "Event not found or already deleted" });
        }
        
        res.status(200).send({ message: 'Event deleted successfully', deletedEvent });
    } catch (error) {
        res.status(500).send({ message: "Error deleting event", error });
    }
});

module.exports = router;
