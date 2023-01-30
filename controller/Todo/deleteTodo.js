const Todo = require('../../models/Todo')

module.exports = async (req, res) => {
  try {
    //find the note by delete
    let todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404).send('Not Found')
    }

    // allow deletion

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed')
    }

    todo = await Todo.findByIdAndDelete(req.params.id)
    res.json({ success: 'deleted Todo' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
