<<<<<<< HEAD
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

  // GET
  if (event.method === 'GET') {
    const [rows] = await db.query(`
      SELECT d.*, c.name AS company_name
      FROM departments d
      LEFT JOIN companies c ON d.company_id = c.id
      ORDER BY d.id DESC
    `)
    return rows
  }

  // POST
  if (event.method === 'POST') {
    const body = await readBody(event)

    await db.query(`
      INSERT INTO departments (company_id, department_name, description, status)
      VALUES (?, ?, ?, ?)
    `, [
      body.company_id,
      body.department_name,
      body.description,
      body.status
    ])

    return { message: 'Added' }
  }

=======
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {

  // GET
  if (event.method === 'GET') {
    const [rows] = await db.query(`
      SELECT d.*, c.name AS company_name
      FROM departments d
      LEFT JOIN companies c ON d.company_id = c.id
      ORDER BY d.id DESC
    `)
    return rows
  }

  // POST
  if (event.method === 'POST') {
    const body = await readBody(event)

    await db.query(`
      INSERT INTO departments (company_id, department_name, description, status)
      VALUES (?, ?, ?, ?)
    `, [
      body.company_id,
      body.department_name,
      body.description,
      body.status
    ])

    return { message: 'Added' }
  }

>>>>>>> menu
})