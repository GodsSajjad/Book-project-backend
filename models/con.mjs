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
    accessToken: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    refreshToken: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
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

        unique: "publisher_unique",
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "publisher_unique",
    },
});

Users.hasMany(Bookdb, {
    foreignKey: "publisher",
    sourceKey: "username",
});

Bookdb.belongsTo(Users, {
    foreignKey: "publisher",
    targetKey: "username",
});

con.sync();
