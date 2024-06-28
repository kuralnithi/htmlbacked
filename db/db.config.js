const Sequelize = require('sequelize');

const db = new Sequelize('html_test','postgres','kural1234',{
    dialect:'postgres',
    host:'localhost',
    port:5432,
    logging:false,
    pool:{max:5}
});

db.authenticate()
    .then(() => console.log("DB connected..."))
    .catch((err) => console.log("error:", err));

module.exports = db;