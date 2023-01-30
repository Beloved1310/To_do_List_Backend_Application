const { validationResult } = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email } = req.body
  let user = await User.findOne({ email })
  if (!user)
    return res
      .status(400)
      .send({ error: 'User with this email does not exists' })

  const token = jwt.sign({ _id: user._id }, FORGOT_PASSWORD, {
    expiresIn: '20m',
  })
  const update = await User.updateOne({ resetLink: token })
  if (!update) return res.status(400).send({ error: 'reset password error' })

  return res.send({
    message: 'Password Updated',
  })
}
