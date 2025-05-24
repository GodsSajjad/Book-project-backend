import joi from "joi";
export const usernameSchema = joi
    .string()
    .min(3)
    .max(30)
    .pattern(/^[A-Za-z][\w._]*$/, "pattern");

export const passwordValidator = joi
    .string()
    .min(8)
    .max(35)
    .pattern(/^\S+$/)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .pattern(/[#$@&%]/);
