<<<<<<< HEAD
import { db } from '../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body

  try {
    // 1️⃣ Get user by email
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return { success: false, message: 'User not found' }
    }

    const user = rows[0]

    // 2️⃣ Compare password 🔐
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { success: false, message: 'Invalid password' }
    }

    // 3️⃣ Success
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Server error'
    }
  }
=======
import { db } from '../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body

  try {
    // 1️⃣ Get user by email
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return { success: false, message: 'User not found' }
    }

    const user = rows[0]

    // 2️⃣ Compare password 🔐
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { success: false, message: 'Invalid password' }
    }

    // 3️⃣ Success
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Server error'
    }
  }
>>>>>>> menu
})