import { db } from '../../utils/db';

export default defineEventHandler(async (event) => {
    try{

        const id = event.context.params.id;
        const body = await readBody(event);

        const{
            title,
            description,
            start_date,
            end_date,
            announcement_type
        } = body;

        await db.query(
            `UPDATE announcements SET 
            title=?,
            description=?,
            start_date=?,
            end_date=?,
            announcement_type=?
            WHERE id=?`,
            [title, description, start_date, end_date, announcement_type, id]
        );

        return {
            success: true,
            message: "Announcement updated"
        };

    }catch(error){
        return{
            success: false,
            error: error.message
        };
    }
});