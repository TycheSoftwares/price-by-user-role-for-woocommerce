import { dispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

export const registerEntities = () => {
	dispatch(coreDataStore).addEntities([
		{
			kind: "pbur",
			name: "init",
			baseURL: "/pbur/v1/init",
		},
		{
			kind: "pbur",
			name: "settings",
			baseURL: "/pbur/v1/settings",
		},
	]);
};
