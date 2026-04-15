<<<<<<< HEAD
=======
<<<<<<< HEAD
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {

    try {

        const body = await readBody(event);

        const {
            user_id,
            basic_salary,
            house_rent_allowance,
            medical_allowance,
            travel_allowance,
            deductions,
            start_date,
            end_date
        } = body;

        const [result] = await db.query(
            `INSERT INTO salaries
            (user_id, basic_salary, house_rent_allowance, medical_allowance, travel_allowance, deductions, start_date, end_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                basic_salary,
                house_rent_allowance,
                medical_allowance,
                travel_allowance,
                deductions,
                start_date,
                end_date
            ]
        );

        return {
            success: true,
            message: "Salary created",
            id: result.insertId
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {

    try {

        const body = await readBody(event);

        const {
            user_id,
            basic_salary,
            house_rent_allowance,
            medical_allowance,
            travel_allowance,
            deductions,
            start_date,
            end_date
        } = body;

        const [result] = await db.query(
            `INSERT INTO salaries
            (user_id, basic_salary, house_rent_allowance, medical_allowance, travel_allowance, deductions, start_date, end_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                basic_salary,
                house_rent_allowance,
                medical_allowance,
                travel_allowance,
                deductions,
                start_date,
                end_date
            ]
        );

        return {
            success: true,
            message: "Salary created",
            id: result.insertId
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
});