import { db } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;

    const [rows] = await db.query(
      `SELECT * FROM announcements WHERE id = ?`,
      [id]
    );

    return {
      success: true,
      data: rows[0]
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});