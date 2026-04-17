import { db } from '../../utils/db';

export default defineEventHandler(async (event) =>{
    try{

        const id = event.context.params.id;

        await db.query(
            `DELETE FROM announcements WHERE id=?`,
            [id]
        );

        return {
            success: true,
            message: "Announcement delete"
        };

    }catch(error){
        return{
            success: false,
            error: error.message
        };
    }
});