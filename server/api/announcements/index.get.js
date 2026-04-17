import { db } from '../../utils/db';

export default defineEventHandler(async (event) => {

    try {
        const query = getQuery(event);

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 5;
        const offset = (page - 1) * limit;

        // Data
        const [rows] = await db.query(
           `SELECT * FROM announcements
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        // Total count
        const [countResult] = await db.query(
            `SELECT COUNT(*) as total FROM announcements`
        );

        return {
            success:true,
            data:rows,
            total:countResult[0].total
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }

});