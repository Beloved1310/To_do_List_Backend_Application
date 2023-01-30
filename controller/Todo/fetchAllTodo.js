const Todo = require('../../models/Todo')

module.exports = async (req, res) => {
  const todo = await Todo.find({ user: req.user.id })
  res.json(todo)
}
