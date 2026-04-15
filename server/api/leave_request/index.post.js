<<<<<<< HEAD
=======
<<<<<<< HEAD
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event);

        const { user_id, leave_type, start_date, end_date, reason, status } = body;

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
        return{
            success: false,
            error: error.message
        };
    }
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event);

        const { user_id, leave_type, start_date, end_date, reason, status } = body;

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
        return{
            success: false,
            error: error.message
        };
    }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
});