import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const [rows] = await db.execute(`
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
      WHERE s.id = 15
    `)

    return {
      status: true,
      message: "Profile fetched successfully",
      data: rows[0]
    }

  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
})