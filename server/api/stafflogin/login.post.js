import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'

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

    // ✅ 2. Fetch staff by MOBILE
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

    // ✅ 4. Success response
    return {
      status: true,
      message: 'Login successful',
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
})