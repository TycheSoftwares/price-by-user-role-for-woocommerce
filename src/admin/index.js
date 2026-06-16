import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import DataProvider from "./data/context";
import App from "./App";
import "./App.scss";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

window.addEventListener(
	"load",
	function () {
		const container = document.querySelector("div#price-by-user-role-for-woocommerce");

		if (container) {
			const root = createRoot(container);
			root.render(
				<DataProvider>
					<HashRouter>
						<App />
					</HashRouter>
				</DataProvider>
			);
		}
	},
	false
);
