<<<<<<< HEAD
=======
<<<<<<< HEAD
import { db } from '../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { id, name, email, password } = body

  try {
    if (!name || !email) {
      return {
        success: false,
        message: 'Name and email required'
      }
    }

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10)

      await db.execute(
        'UPDATE admins SET name=?, email=?, password=? WHERE id=?',
        [name, email, hashedPassword, id]
      )
    } else {
      await db.execute(
        'UPDATE admins SET name=?, email=? WHERE id=?',
        [name, email, id]
      )
    }

    const [rows] = await db.execute(
      'SELECT id, name, email FROM admins WHERE id=?',
      [id]
    )

    return {
      success: true,
      user: rows[0]
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Update failed'
    }
  }
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
import { db } from '../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { id, name, email, password } = body

  try {
    if (!name || !email) {
      return {
        success: false,
        message: 'Name and email required'
      }
    }

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10)

      await db.execute(
        'UPDATE admins SET name=?, email=?, password=? WHERE id=?',
        [name, email, hashedPassword, id]
      )
    } else {
      await db.execute(
        'UPDATE admins SET name=?, email=? WHERE id=?',
        [name, email, id]
      )
    }

    const [rows] = await db.execute(
      'SELECT id, name, email FROM admins WHERE id=?',
      [id]
    )

    return {
      success: true,
      user: rows[0]
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Update failed'
    }
  }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})