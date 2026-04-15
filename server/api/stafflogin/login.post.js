<<<<<<< HEAD
import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
=======
<<<<<<< HEAD
import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { mobile, password } = body

    // ✅ 1. Validation
    if (!mobile || !password) {
      return {
        status: false,
        message: 'Mobile and password required'
      }
    }

    // ✅ 2. Fetch staff
    const [rows] = await db.execute(
      'SELECT id, name, email, mobile, username, password, company_id, designation FROM staff WHERE mobile = ?',
      [mobile]
    )

    if (rows.length === 0) {
      return {
        status: false,
        message: 'Invalid mobile number'
      }
    }

    const staff = rows[0]

    // ✅ 3. Compare password
    const isMatch = await bcrypt.compare(password, staff.password)

    if (!isMatch) {
      return {
        status: false,
        message: 'Invalid password'
      }
    }

    // ✅ 4. Generate JWT Token
    const token = jwt.sign(
      {
        id: staff.id,
        mobile: staff.mobile,
        company_id: staff.company_id
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    )

    // ✅ 5. Success response
    return {
      status: true,
      message: 'Login successful',
      token, // ✅ token added
      data: {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        mobile: staff.mobile,
        username: staff.username,
        company_id: staff.company_id,
        designation: staff.designation
      }
    }

  } catch (error) {
    return {
      status: false,
      message: 'Server error',
      error: error.message
    }
  }
=======
import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { mobile, password } = body

    // ✅ 1. Validation
    if (!mobile || !password) {
      return {
        status: false,
        message: 'Mobile and password required'
      }
    }

<<<<<<< HEAD
    // ✅ 2. Fetch staff
=======
    // ✅ 2. Fetch staff by MOBILE
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
    const [rows] = await db.execute(
      'SELECT id, name, email, mobile, username, password, company_id, designation FROM staff WHERE mobile = ?',
      [mobile]
    )

    if (rows.length === 0) {
      return {
        status: false,
        message: 'Invalid mobile number'
      }
    }

    const staff = rows[0]

    // ✅ 3. Compare password
    const isMatch = await bcrypt.compare(password, staff.password)

    if (!isMatch) {
      return {
        status: false,
        message: 'Invalid password'
      }
    }

<<<<<<< HEAD
    // ✅ 4. Generate JWT Token
    const token = jwt.sign(
      {
        id: staff.id,
        mobile: staff.mobile,
        company_id: staff.company_id
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    )

    // ✅ 5. Success response
    return {
      status: true,
      message: 'Login successful',
      token, // ✅ token added
=======
    // ✅ 4. Success response
    return {
      status: true,
      message: 'Login successful',
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
      data: {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        mobile: staff.mobile,
        username: staff.username,
        company_id: staff.company_id,
        designation: staff.designation
      }
    }

  } catch (error) {
    return {
      status: false,
      message: 'Server error',
      error: error.message
    }
  }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})