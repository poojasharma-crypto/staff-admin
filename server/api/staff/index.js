import bcrypt from 'bcryptjs'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // ================= GET =================
  if (method === 'GET') {
    const [rows] = await db.execute(`
      SELECT 
        s.id,
        s.company_id,
        c.name AS company_name,
        s.name,
        s.email,
        s.mobile,
        s.location,
        s.dob,
        s.profile_image,

        s.department_id,
        d.department_name,   -- ✅ department name

        s.designation,
        s.join_date,
        s.salary,
        s.salary_type,
        s.username,
        s.last_login,
        s.login_ip

      FROM staff s
      LEFT JOIN companies c ON c.id = s.company_id
      LEFT JOIN departments d ON d.id = s.department_id   -- ✅ JOIN

      ORDER BY s.id DESC
    `)

    return rows
  }

  // ================= POST =================
  if (method === 'POST') {
    const body = await readBody(event)

    const {
      company_id,
      name,
      email,
      mobile,
      location,
      dob,
      profile_image,
      department_id,   // ✅ IMPORTANT
      designation,
      join_date,
      salary,
      salary_type,
      username,
      password,
      last_login,
      login_ip
    } = body

    if (!company_id || !name || !email || !username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields missing'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.execute(`
      INSERT INTO staff
      (
        company_id,
        name,
        email,
        mobile,
        location,
        dob,
        profile_image,
        department_id,
        designation,
        join_date,
        salary,
        salary_type,
        username,
        password,
        last_login,
        login_ip
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      company_id,
      name,
      email,
      mobile || null,
      location || null,
      dob || null,
      profile_image || null,
      department_id || null,   // ✅ FIXED
      designation || null,
      join_date || null,
      salary || null,
      salary_type || null,
      username,
      hashedPassword,
      last_login || null,
      login_ip || null
    ])

    return { success: true }
  }
})