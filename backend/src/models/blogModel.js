import { db } from "../config/db.js";

// Create a new blog post
export const createBlog = (title, content, author, userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO blogs (title, content, author, user_id)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [title, content, author, userId], function (err) {
      if (err) {
        reject(err);
      } else {
        // return inserted ID
        resolve(this.lastID);
      }
    });
  });
};

// Get all blog posts
export const getAllBlogs = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM blogs
      ORDER BY created_at DESC
    `;

    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Get single blog by ID
export const getBlogById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM blogs WHERE id = ?`;

    db.get(query, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Update blog
export const updateBlog = (id, title, content) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE blogs
      SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(query, [title, content, id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};

// Delete blog
export const deleteBlog = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM blogs WHERE id = ?`;

    db.run(query, [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};