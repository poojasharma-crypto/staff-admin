<<<<<<< HEAD
=======
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
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your mysql password
  database: 'staff_admin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})