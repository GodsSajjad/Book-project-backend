import con from "./database.mjs";
import { DataTypes } from "@sequelize/core";
export const Users = con.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
export const Bookdb = con.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
    },
    publisher: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Users.hasOne(Bookdb, {
    foreignKey: "publisher",
    sourceKey: "username",
});
con.sync();
