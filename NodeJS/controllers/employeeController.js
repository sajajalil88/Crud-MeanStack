const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:3000/employees/
router.get('/', async (req, res) => {
    try {
        const docs = await Employee.find();
        res.send(docs);
    } catch (err) {
        console.error('Error in Retrieving Employees:', err);
        res.status(500).json({ error: 'An error occurred while retrieving employees' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with given id : ${req.params.id}`);
        }

        const doc = await Employee.findById(req.params.id);
        res.send(doc);
    } catch (err) {
        console.error('Error in Retrieving Employee:', err);
        res.status(500).json({ error: 'An error occurred while retrieving the employee' });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.salary) {
        return res.status(400).json({ message: 'name and salary are required' });
    }
    try {
        const emp = await Employee.create({
            name: req.body.name,
            salary: req.body.salary,
        });
        res.status(201).json(emp);
    } catch (err) {
        console.error('Error in Employee Save:', err);
        res.status(500).json({ error: 'An error occurred while saving the employee' });
    }
});




router.put('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with given id : ${req.params.id}`);
        }

        const emp = {
            name: req.body.name,
            salary: req.body.salary,
        };

        const doc = await Employee.findByIdAndUpdate(req.params.id, emp, { new: true });
        res.send(doc);
    } catch (err) {
        console.error('Error in Employee Update:', err);
        res.status(500).json({ error: 'An error occurred while updating the employee' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with given id : ${req.params.id}`);
        }

        const doc = await Employee.findByIdAndRemove(req.params.id);
        res.send(doc);
    } catch (err) {
        console.error('Error in Employee Delete:', err);
        res.status(500).json({ error: 'An error occurred while deleting the employee' });
    }
});

module.exports = router;
