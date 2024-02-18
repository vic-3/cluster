import {
	ChatBubbleLeftIcon,
	CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "framework7-react";
import { useState } from "react";

const BottomNav = () => {
	const [activeTab, setActiveTab] = useState(true);

	return (
		<div
			className={`fixed bottom-0 left-0 w-full z-[5000] text-zinc-500 transition-all`}
		>
			<nav
				// onTouchStart={(e) => handleTouchStart(e, "nav")}
				// onTouchEnd={handleTouchEnd}
				className={`flex justify-evenly transition-all w-full h-max py-2 bg-zinc-100 border-t-2 border-y-2 border-zinc-300 rounded-t-xl relative`}
			>
				<Link
					tabLink="#home"
					onClick={() => setActiveTab(true)}
					className={`flex flex-col text-[11px] ${
						activeTab ? "text-primary" : ""
					}`}
				>
					<ChatBubbleLeftIcon className="h-6" />
					Messages
				</Link>
				<Link
					onClick={() => setActiveTab(false)}
					tabLink="#assets"
					className={`flex flex-col text-[11px] ${
						!activeTab ? "text-primary" : ""
					}`}
				>
					<CurrencyDollarIcon className="h-6" />
					Assets
				</Link>
			</nav>
		</div>
	);
};

export default BottomNav;
