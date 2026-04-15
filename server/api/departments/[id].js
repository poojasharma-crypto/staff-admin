<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
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
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})