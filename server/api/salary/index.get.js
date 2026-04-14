import { db } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const user_id = query.user_id;

    let sql = `SELECT * FROM salaries`;
    let params = [];

    if (user_id) {
      sql += ` WHERE user_id = ?`;
      params.push(user_id);
    }

    sql += ` ORDER BY created_at DESC LIMIT 1`;

    const [rows] = await db.query(sql, params);

    if (rows.length === 0) {
      return {
        success: false,
        message: "No salary found"
      };
    }

    const s = rows[0];

    //  calculations
    const basic = Number(s.basic_salary);
    const hra = Number(s.house_rent_allowance);
    const medical = Number(s.medical_allowance);
    const travel = Number(s.travel_allowance);
    const deductions = Number(s.deductions);

    const allowances = hra + medical + travel;
    const net_salary = basic + allowances - deductions;
    const total_earnings = basic + allowances;

    return {
      success: true,

      //  Top section
      summary: {
        total_earnings,
        net_salary
      },

      //  Breakdown
      breakdown: {
        basic,
        allowances,
        other: deductions
      },

      //  Details
      details: {
        basic_salary: basic,
        house_rent_allowance: hra,
        medical_allowance: medical,
        travel_allowance: travel,
        deductions
      }
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});