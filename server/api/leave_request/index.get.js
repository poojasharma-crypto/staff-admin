import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {

    try {

        const query = getQuery(event);

        const status = query.status || null;

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 5;
        const offset = (page - 1) * limit;

        // Total count
            let countSql = `SELECT COUNT(*) as total FROM leave_requests`;
            const countParams = [];

            if (status && status.toLowerCase() !== "all") {
            countSql += ` WHERE status = ?`;
            countParams.push(status);
            }

            const [[{ total }]] = await db.query(countSql, countParams);

        // pagination data
            let sql = `
            SELECT id, user_id, leave_type, start_date, end_date, reason, status
            FROM leave_requests
            `;

            const params = [];

            if (status && status.toLowerCase() !== "all") {
            sql += ` WHERE status = ?`;
            params.push(status);
            }

            sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
            params.push(limit, offset);

            const [rows] = await db.query(sql, params);

        // Get counts by leave type
        const [countRows] = await db.query(`
            SELECT leave_type, COUNT(*) as total
            FROM leave_requests
            GROUP BY leave_type
            `);

        // Convert into object
        const counts = {
            Casual: 0,
            Sick: 0,
            Paid: 0,
            Other: 0
        };

        countRows.forEach(row => {
            if (counts[row.leave_type] !== undefined) {
                counts[row.leave_type] = row.total;
            } else {
                counts["Other"] += row.total;
            }
        });

        return {
            success: true,
            counts,
            data: rows,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };

    } catch (error) {

        return {
            success: false,
            error: error.message
        };
    }
});