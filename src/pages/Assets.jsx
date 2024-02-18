import { ArrowDownTrayIcon, ArrowUpRightIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, Tab } from "framework7-react";
import { img2 } from "../assets";

const Assets = () => {
	return (
		<Tab id="assets" className="page-content pb-72">
			<div className="flex justify-between items-center p-4 text-zinc-600">
				<h1 className=" text-2xl font-semibold">Assets</h1>
				<Link
					href="/settings"
					className="rounded-full bg-blue-200 text-primary p-2"
				>
					<UserIcon className="h-5" />
				</Link>
			</div>
			<div className="p-4 py-0 relative">
				<div className="relative bg-zinc-200 shadow w-full rounded overflow-clip">
					<img src={img2} className=" w-full" alt="" />
				<div className="font-semibold text-sm text-zinc-200 absolute bottom-10 left-[30%]">
					Where the world trades
				</div>
				</div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button className="p-4 flex justify-center items-center gap-3 font-semibold rounded bg-primary text-zinc-100">
                       <ArrowUpRightIcon className="h-6" /> Send
                    </button>
                    <button className="p-4 flex justify-center items-center gap-3 font-semibold rounded bg-zinc-200">
                       <ArrowDownTrayIcon className="h-6" /> Claim
                    </button>
                </div>
			</div>
		</Tab>
	);
};

export default Assets;
