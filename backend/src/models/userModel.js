import { db } from "../config/db.js";

// Create new user
export const createUser = (email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `;

    db.run(query, [email, hashedPassword], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};


// Find user by email
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM users WHERE email = ?
    `;

    db.get(query, [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};