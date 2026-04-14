import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // GET ALL
  if (method === 'GET') {
    const [rows] = await db.execute(
      'SELECT * FROM companies ORDER BY id DESC'
    )
    return rows
  }

  // ADD
  if (method === 'POST') {
    const body = await readBody(event)

    const {
      name, logo, type, description, gst, pan, registration_number
    } = body

    await db.execute(
      `INSERT INTO companies 
      (name, logo, type, description, gst, pan, registration_number) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, logo, type, description, gst, pan, registration_number]
    )

    return { success: true }
  }
})