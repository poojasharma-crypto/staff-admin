<<<<<<< HEAD
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your mysql password
  database: 'staff_admin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
=======
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your mysql password
  database: 'staff_admin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
>>>>>>> menu
})