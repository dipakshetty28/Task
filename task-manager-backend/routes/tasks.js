const router = require('express').Router();
let Task = require('../models/task.model');

// Get all tasks
router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new task
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;

  const newTask = new Task({
    title,
    description,
    status,
  });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a task by id
router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.status = req.body.status;

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a task
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
