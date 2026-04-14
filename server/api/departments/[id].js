import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  // UPDATE
  if (event.method === 'PUT') {
    const body = await readBody(event)

    await db.query(`
      UPDATE departments
      SET company_id=?, department_name=?, description=?, status=?
      WHERE id=?
    `, [
      body.company_id,
      body.department_name,
      body.description,
      body.status,
      id
    ])

    return { message: 'Updated' }
  }

  // DELETE
  if (event.method === 'DELETE') {
    await db.query(`DELETE FROM departments WHERE id=?`, [id])
    return { message: 'Deleted' }
  }
})