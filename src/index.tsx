import React from "react";
import ReactDOM from "react-dom";
import darkTheme from "./theme/darkTheme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Favorites from "./pages/Favorites/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/common/header/Header";
import { Footer } from "./components/common/footer/Footer";
import { Settings } from "./pages/Settings/Settings";
import { Explore } from "./pages/Explore/Explore";

const routing = (
	<ThemeProvider theme={darkTheme}>
		<BrowserRouter>
			<CssBaseline />
			<Header />
			<Routes>
				<Route path={"/explore"} element={<Explore />} />
				<Route path={"/settings"} element={<Settings />} />
				<Route path="*" element={<Favorites />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</ThemeProvider>
);

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(routing, root);
