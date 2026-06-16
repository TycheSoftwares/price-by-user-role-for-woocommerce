import { dispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";

const CONTEXT = "pbur";

export const toast = {
    success(message) {
        dispatch(noticesStore).createNotice("success", message, { context: CONTEXT });
    },

    error(message) {
        dispatch(noticesStore).createNotice("error", message, { context: CONTEXT });
    },

    warning(message) {
        dispatch(noticesStore).createNotice("warning", message, { context: CONTEXT });
    },

    info(message) {
        dispatch(noticesStore).createNotice("info", message, { context: CONTEXT });
    },
};
