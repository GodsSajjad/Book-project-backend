import bcrypt from "bcrypt";
const salrounds = 10;
export async function hashPssword(password) {
    try {
        const salt = await bcrypt.genSalt(salrounds);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (e) {
        console.log(e.message);
    }
}
export async function comparePassword(peain, hashed) {
    try {
        const result = await bcrypt.compare(peain, hashed);
        return result;
    } catch (e) {
        console.log(e.message);
    }
}
