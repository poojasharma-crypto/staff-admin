<<<<<<< HEAD
import { db } from '../../utils/db'

export default defineEventHandler( async () => {

    try{

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
                if ( counts[row.leave_type] !== undefined){
                    counts[row.leave_type] = row.total;
                }else{
                    counts["Other"] += row.total;
                }
            });

            // Get recent leaves ()

            const [recent] = await db.query(`
            SELECT id, user_id, leave_type, start_date, end_date, reason, status
            FROM leave_requests
            ORDER BY created_at DESC
            LIMIT 5 
            `);

            return {
                sussess: true,
                counts,
                recent
            };
            
    } catch (error) {

        return{
            success: false,
            error: error.message
        };
    }
=======
import { db } from '../../utils/db'

export default defineEventHandler( async () => {

    try{

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
                if ( counts[row.leave_type] !== undefined){
                    counts[row.leave_type] = row.total;
                }else{
                    counts["Other"] += row.total;
                }
            });

            // Get recent leaves ()

            const [recent] = await db.query(`
            SELECT id, user_id, leave_type, start_date, end_date, reason, status
            FROM leave_requests
            ORDER BY created_at DESC
            LIMIT 5 
            `);

            return {
                sussess: true,
                counts,
                recent
            };
            
    } catch (error) {

        return{
            success: false,
            error: error.message
        };
    }
>>>>>>> menu
});