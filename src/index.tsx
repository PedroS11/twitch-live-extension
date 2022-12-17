import React from "react";
import ReactDOM from "react-dom";
import darkTheme from "./theme/darkTheme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/common/header/Header";
import { Footer } from "./components/common/footer/Footer";
import "./index.css";

const Explore = React.lazy(() => import("./pages/Explore/Explore"));
const Settings = React.lazy(() => import("./pages/Settings/Settings"));
const FollowedStreams = React.lazy(
	() => import("./pages/FollowedStreams/FollowedStreams"),
);

const routing = (
	<ThemeProvider theme={darkTheme}>
		<BrowserRouter>
			<CssBaseline />
			<Header />
			<Routes>
				<Route
					path={"/explore"}
					element={
						<React.Suspense fallback={<>...</>}>
							<Explore />
						</React.Suspense>
					}
				/>
				<Route
					path={"/settings"}
					element={
						<React.Suspense fallback={<>...</>}>
							<Settings />
						</React.Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<React.Suspense fallback={<>...</>}>
							<FollowedStreams />
						</React.Suspense>
					}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	</ThemeProvider>
);

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(routing, root);
