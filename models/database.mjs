import { Sequelize } from "@sequelize/core";
import "dotenv/config";
let sequelize = new Sequelize({
    port: Number(process.env.PORT_DB),
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
    user: process.env.USER_DB,
    dialect: process.env.DIALECT_DB,
    host: process.env.HOST_DB,
});
try {
    await sequelize.authenticate();
} catch (e) {
    console.log("error in connaction DataBase is: " + e.message);
    process.exit(0);
}
export default sequelize;
