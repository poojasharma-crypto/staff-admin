import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const method = event.node.req.method

  // UPDATE
  if (method === 'PUT') {
    const body = await readBody(event)

    const {
      name, logo, type, description, gst, pan, registration_number
    } = body

    await db.execute(
      `UPDATE companies 
       SET name=?, logo=?, type=?, description=?, gst=?, pan=?, registration_number=? 
       WHERE id=?`,
      [name, logo, type, description, gst, pan, registration_number, id]
    )

    return { success: true }
  }

  // DELETE
  if (method === 'DELETE') {
    await db.execute('DELETE FROM companies WHERE id=?', [id])
    return { success: true }
  }
})