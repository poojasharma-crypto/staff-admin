<<<<<<< HEAD
import bcrypt from 'bcryptjs'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const method = event.node.req.method

  // ================= UPDATE =================
  if (method === 'PUT') {
    const body = await readBody(event)

    const {
      company_id,
      name,
      email,
      mobile,
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

    if (!company_id || !name || !email || !username) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields missing'
      })
    }

    // 👉 WITH PASSWORD
    if (password && String(password).trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10)

      await db.execute(`
        UPDATE staff
        SET company_id=?, name=?, email=?, mobile=?, profile_image=?,
            department_id=?, designation=?, join_date=?, salary=?, salary_type=?,
            username=?, password=?, last_login=?, login_ip=?
        WHERE id=?
      `, [
        company_id,
        name,
        email,
        mobile || null,
        profile_image || null,
        department_id || null,
        designation || null,
        join_date || null,
        salary || null,
        salary_type || null,
        username,
        hashedPassword,
        last_login || null,
        login_ip || null,
        id
      ])

    } else {
      // 👉 WITHOUT PASSWORD
      await db.execute(`
        UPDATE staff
        SET company_id=?, name=?, email=?, mobile=?, profile_image=?,
            department_id=?, designation=?, join_date=?, salary=?, salary_type=?,
            username=?, last_login=?, login_ip=?
        WHERE id=?
      `, [
        company_id,
        name,
        email,
        mobile || null,
        profile_image || null,
        department_id || null,
        designation || null,
        join_date || null,
        salary || null,
        salary_type || null,
        username,
        last_login || null,
        login_ip || null,
        id
      ])
    }

    return { success: true }
  }

  // ================= DELETE =================
  if (method === 'DELETE') {
    await db.execute('DELETE FROM staff WHERE id=?', [id])
    return { success: true }
  }
=======
import bcrypt from 'bcryptjs'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const method = event.node.req.method

  // ================= UPDATE =================
  if (method === 'PUT') {
    const body = await readBody(event)

    const {
      company_id,
      name,
      email,
      mobile,
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

    if (!company_id || !name || !email || !username) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Required fields missing'
      })
    }

    // 👉 WITH PASSWORD
    if (password && String(password).trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10)

      await db.execute(`
        UPDATE staff
        SET company_id=?, name=?, email=?, mobile=?, profile_image=?,
            department_id=?, designation=?, join_date=?, salary=?, salary_type=?,
            username=?, password=?, last_login=?, login_ip=?
        WHERE id=?
      `, [
        company_id,
        name,
        email,
        mobile || null,
        profile_image || null,
        department_id || null,
        designation || null,
        join_date || null,
        salary || null,
        salary_type || null,
        username,
        hashedPassword,
        last_login || null,
        login_ip || null,
        id
      ])

    } else {
      // 👉 WITHOUT PASSWORD
      await db.execute(`
        UPDATE staff
        SET company_id=?, name=?, email=?, mobile=?, profile_image=?,
            department_id=?, designation=?, join_date=?, salary=?, salary_type=?,
            username=?, last_login=?, login_ip=?
        WHERE id=?
      `, [
        company_id,
        name,
        email,
        mobile || null,
        profile_image || null,
        department_id || null,
        designation || null,
        join_date || null,
        salary || null,
        salary_type || null,
        username,
        last_login || null,
        login_ip || null,
        id
      ])
    }

    return { success: true }
  }

  // ================= DELETE =================
  if (method === 'DELETE') {
    await db.execute('DELETE FROM staff WHERE id=?', [id])
    return { success: true }
  }
>>>>>>> menu
})