import { db } from '../../utils/db';

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event);

        const{
            title,
            description,
            start_date,
            end_date,
            announcement_type
        } = body;

        const [result] = await db.query(
            `INSERT INTO announcements
            (title, description, start_date, end_date, announcement_type)
            VALUES (?, ?, ?, ?, ?)`,
            [title, description, start_date, end_date, announcement_type]
        );

        return {
            success: true,
            message: "Announcement created",
            id: result.insertId
        };

    }catch(error){
        return{
            success: false,
            error: error.message
        };
    }
});