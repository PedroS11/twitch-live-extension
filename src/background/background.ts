import { fetchToken } from "../infrastructure/identityFlowAuth/identityFlowAuth";

(async () => {
	console.log("BACKGROUND SCRIPT");
	await fetchToken(true);
	console.log("BACKGROUND SCRIPT 2");
})();
