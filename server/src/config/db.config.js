// server/src/config/db.config.js
module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres", // Replace with your DB username
    PASSWORD: process.env.DB_PASSWORD || "your_db_password", // Replace with your DB password
    DB: process.env.DB_NAME || "keka_clone_db", // Replace with your DB name
    PORT: process.env.DB_PORT || 5432,        // Default PostgreSQL port
    dialect: "postgres",
    pool: { // Optional: connection pool configuration
      max: 5,     // max number of connections in pool
      min: 0,     // min number of connections in pool
      acquire: 30000, // max time (ms) that pool will try to get connection before throwing error
      idle: 10000     // max time (ms) that connection can be idle before being released
    }
  };