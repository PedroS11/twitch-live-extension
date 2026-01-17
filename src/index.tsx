import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import darkTheme from "./theme/darkTheme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/common/header/Header";
import { Footer } from "./components/common/footer/Footer";
import "./index.css";

const Explore = lazy(() => import("./pages/Explore/Explore"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const FollowedStreams = lazy(
	() => import("./pages/FollowedStreams/FollowedStreams"),
);

const App = () => (
	<ThemeProvider theme={darkTheme}>
		<HashRouter>
			<CssBaseline />
			<Header />
			<Routes>
				<Route
					path={"/explore"}
					element={
						<Suspense fallback={<>...</>}>
							<Explore />
						</Suspense>
					}
				/>
				<Route
					path={"/settings"}
					element={
						<Suspense fallback={<>...</>}>
							<Settings />
						</Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<Suspense fallback={<>...</>}>
							<FollowedStreams />
						</Suspense>
					}
				/>
			</Routes>
			<Footer />
		</HashRouter>
	</ThemeProvider>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
