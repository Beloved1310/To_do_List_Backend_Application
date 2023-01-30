const { validationResult } = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  let success = false
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let user = await User.findOne({ email: req.body.email })

  try {
    if (user) {
      return res.status(400).json({
        success: success,
        error: 'Sorry Email With this user Already Exists...',
      })
    }

    const salt = await bcrypt.genSalt(10)
    hashPassword = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    })

    const data = {
      user: {
        id: user.id,
        name: user.name,
      },
    }
    let name = data.user.name
    //  console.log(name);
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    // res.send(req.body)
    res.json({ authToken, success, name })
    //   res.json({authToken,name})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
