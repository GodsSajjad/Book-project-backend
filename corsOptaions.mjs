import { allowedOrigin } from "./Origins/allowedOrigin.mjs";

export const corsOptaion = {
    origin: allowedOrigin,
    credential: true,
    optionsSuccessStatus: 200,
    preflighContinue: false,
};
