<<<<<<< HEAD
import { db } from '../../utils/db'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    // ✅ 1. Get token from header
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        status: false,
        message: 'Unauthorized: No token'
      }
    }

    const token = authHeader.split(' ')[1]

    // ✅ 2. Verify token
    let decoded
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_secret_key'
      )
    } catch (err) {
      return {
        status: false,
        message: 'Invalid or expired token'
      }
    }

    const userId = decoded.id

    // ✅ 3. Fetch user by token id
    const [rows] = await db.execute(
      `
=======
<<<<<<< HEAD
import { db } from '../../utils/db'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    // ✅ 1. Get token from header
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        status: false,
        message: 'Unauthorized: No token'
      }
    }

    const token = authHeader.split(' ')[1]

    // ✅ 2. Verify token
    let decoded
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_secret_key'
      )
    } catch (err) {
      return {
        status: false,
        message: 'Invalid or expired token'
      }
    }

    const userId = decoded.id

    // ✅ 3. Fetch user by token id
    const [rows] = await db.execute(
      `
      SELECT 
        s.id,
        s.name,
        s.email,
        s.mobile,
        s.profile_image,
        s.designation,
        s.join_date,
        s.salary,
        s.salary_type,
        s.username,
        s.login_ip,
        s.last_login,
        c.name AS company_name,
        d.department_name AS department_name
      FROM staff s
      LEFT JOIN companies c ON s.company_id = c.id
      LEFT JOIN departments d ON s.department_id = d.id
      WHERE s.id = ?
      `,
      [userId]
    )

    if (rows.length === 0) {
      return {
        status: false,
        message: 'User not found'
      }
    }

    return {
      status: true,
      message: 'Profile fetched successfully',
      data: rows[0]
    }

  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
=======
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const [rows] = await db.execute(`
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
      SELECT 
        s.id,
        s.name,
        s.email,
        s.mobile,
        s.profile_image,
        s.designation,
        s.join_date,
        s.salary,
        s.salary_type,
        s.username,
        s.login_ip,
        s.last_login,
        c.name AS company_name,
        d.department_name AS department_name
      FROM staff s
      LEFT JOIN companies c ON s.company_id = c.id
      LEFT JOIN departments d ON s.department_id = d.id
<<<<<<< HEAD
      WHERE s.id = ?
      `,
      [userId]
    )

    if (rows.length === 0) {
      return {
        status: false,
        message: 'User not found'
      }
    }

    return {
      status: true,
      message: 'Profile fetched successfully',
=======
      WHERE s.id = 15
    `)

    return {
      status: true,
      message: "Profile fetched successfully",
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
      data: rows[0]
    }

  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})