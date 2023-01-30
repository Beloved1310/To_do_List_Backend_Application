const Todo = require('../../models/Todo')
const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
  try {
    const { title, task, isComplete } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const todo = new Todo({
      title,
      task,
      isComplete,
      user: req.user.id,
    })
    const saveTodo = await todo.save()
    res.json(saveTodo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
