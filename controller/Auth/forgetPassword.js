const { validationResult } = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, newPassword } = req.body
  let user = await User.findOne({ email })
  if (!user)
    return res
      .status(400)
      .send({ error: 'User with this email does not exists' })
  const salt = await bcrypt.genSalt(10)
  let hashPassword = await bcrypt.hash(newPassword, salt)

  const update = await User.updateOne({ password: hashPassword })
  if (!update) return res.status(400).send({ error: 'reset password error' })

  return res.send({
    message: 'Password Updated, Proceed to Login',
  })
}
