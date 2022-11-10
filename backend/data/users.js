import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'admin shop',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },{
    name: 'Ada Shoelace',
    email: 'adashoelace@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users