const Todo = require('../../models/Todo')
const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
  try {
    const { title, task, isComplete } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const newTodo = {}
    if (title) {
      newTodo.title = title
    }
    if (task) {
      newTodo.task = task
    }
    if (isComplete) {
      newTodo.isComplete = isComplete
    }

    //find the note by id
    let todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404).send('Not Found')
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed')
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true },
    )
    res.json({ todo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
