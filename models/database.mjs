import { Sequelize } from "@sequelize/core";
let sequelize = new Sequelize({
    port: 3306,
    database: "Book_Database",
    password: "enter your password db",
    user: "root",
    dialect: "mysql",
    host: "127.0.0.1",
});
try {
    await sequelize.authenticate();
} catch (e) {
    console.log("error in connaction is: " + e.message);
    process.exit(0);
}
export default sequelize;
