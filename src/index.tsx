import React from "react";
import ReactDOM from "react-dom";
import darkTheme from "./theme/darkTheme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./pages/App/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const routing = (
	<ThemeProvider theme={darkTheme}>
		<BrowserRouter>
			<CssBaseline />
			<Routes>
				<Route path="*" element={<App />} />
			</Routes>
		</BrowserRouter>
	</ThemeProvider>
);

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(routing, root);
