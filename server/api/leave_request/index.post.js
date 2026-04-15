import { db } from '../../utils/db';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        const { id, user_id, leave_type, start_date, end_date, reason, status } = body;

        //  CASE 1: UPDATE (Approve / Reject)
        if (id) {
            const numericId = parseInt(id);

            console.log("UPDATE HIT:", numericId, status);

            const [result] = await db.query(
                `UPDATE leave_requests 
     SET status = ?, updated_at = NOW()
     WHERE id = ?`,
                [status, numericId]
            );

            console.log("Affected rows:", result.affectedRows);

            return {
                success: true,
                message: `Leave ${status} successfully`
            };
        }

        //  CASE 2: INSERT (Create Leave)
        const [result] = await db.query(
            `INSERT INTO leave_requests
      (user_id, leave_type, start_date, end_date, reason, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, leave_type, start_date, end_date, reason, status]
        );

        return {
            success: true,
            message: "Leave created",
            id: result.insertId
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
});