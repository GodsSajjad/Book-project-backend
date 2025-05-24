import { Sequelize } from "@sequelize/core";
import "dotenv/config";
let sequelize = new Sequelize({
<<<<<<< HEAD
    port: Number(process.env.PORT_DB),
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
    user: process.env.USER_DB,
    dialect: process.env.DIALECT_DB,
    host: process.env.HOST_DB,
=======
    port: 3306,
    database: "Book_Database",
    password: "enter your password db",
    user: "root",
    dialect: "mysql",
    host: "127.0.0.1",
>>>>>>> 66660bb00d8219c7f028e551d455840c551ee3a5
});
try {
    await sequelize.authenticate();
} catch (e) {
    console.log("error in connaction DataBase is: " + e.message);
    process.exit(0);
}
export default sequelize;
