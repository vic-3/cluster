import PageTabs from "../components/App/PageTabs.jsx";
import Chat from "../pages/Chat.jsx";
import SignIn from "../pages/SignIn.jsx";
import Settings from "../pages/Settings.jsx";

var routes = [
	{
		path: "/",
		component: SignIn,
	},
	{
		path: "/home",
		component: PageTabs,
	},
	{
		path: "/chat/:id",
		component: Chat,
	},
	{
		path: "/settings",
		component: Settings,
	},
];

export default routes;
