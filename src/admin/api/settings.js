import apiFetch from "@wordpress/api-fetch";
import { handleResponse } from "./utils";
import { createApi } from "./index";
import { clearCache as clearDashboardCache } from "./dashboard";

const api = createApi("settings");

export const fetch = api.fetch;
export const clearCache = api.clearCache;

export function save(data) {
    return api.save(data).then((result) => {
        // api.save caches { message, settings } — wrong shape for subsequent fetches.
        // Clear it so the next fetchSettings() re-fetches the flat settings from the API.
        api.clearCache();
        clearDashboardCache();
        return result;
    });
}

export function reset(section) {
    return apiFetch({
        path: "/pbur/v1/settings/reset",
        method: "POST",
        data: { section },
    })
        .then(handleResponse)
        .then((result) => {
            clearDashboardCache();
            return result;
        });
}

export function resetTracking() {
    return apiFetch({
        path: "/pbur/v1/settings/reset-tracking",
        method: "POST",
        data: {},
    }).then(handleResponse);
}
