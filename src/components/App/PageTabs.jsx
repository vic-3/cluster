import { Page, Tabs } from "framework7-react";
import Assets from "../../pages/Assets";
import Home from "../../pages/Home";
import BottomNav from "./BottomNav";

const PageTabs = () => {
	return (
		<Page pageContent={false} className=" bg-zinc-100">
			{/* pages */}
			<Tabs>
				<Home />
				<Assets />
				<BottomNav />
			</Tabs>
		</Page>
	);
};

export default PageTabs;
