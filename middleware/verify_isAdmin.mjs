import AppError from "../utails/AppError.mjs";

export const isAdmin_verifyer = (req, res, next) => {
    const user = req.user;
    if (!user) return next(new AppError("accessToken not validate", 401));
    if (!user.isAdmin) return next(new AppError("you do not have access to this route", 403));
    next();
};
