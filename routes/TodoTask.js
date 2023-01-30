const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const { body } = require('express-validator')
const addTodo = require('../controller/Todo/addTodo')
const updateTodo = require('../controller/Todo/updateTodo')
const deleteTodo = require('../controller/Todo/deleteTodo')
const fetchAllTodo = require('../controller/Todo/fetchAllTodo')

router.post(
  '/addTodo',
  authUser,
  [
    body('title', 'Title must be atleast 3 characters...').isLength({ min: 3 }),
    body('task', 'Enter a Valid Task').isLength({ min: 3 }),
  ],
  addTodo,
)

router.put(
  '/updateTodo/:id',
  authUser,
  [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('task', 'Task must be atleast 5 characters...').isLength({ min: 5 }),
  ],
  updateTodo,
)

router.delete('/deleteTodo/:id', authUser, deleteTodo)

router.get('/fetchAllTodo', authUser, fetchAllTodo)
module.exports = router
