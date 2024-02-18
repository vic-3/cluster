import {
	ArrowRightOnRectangleIcon,
	CheckBadgeIcon,
	ChevronLeftIcon,
	DocumentDuplicateIcon,
	UserIcon,
} from "@heroicons/react/20/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { Page } from "framework7-react";
import { useContext } from "react";
import { DB } from "../contexts/DBContext";

const Settings = ({ f7router }) => {
	const { user, auth } = useContext(DB);

	return (
		<Page className="bg-zinc-100">
			<nav className="p-4 bg-zinc-200 text-zinc-600 relative">
				<div className="flex justify-between">
					<ChevronLeftIcon
						onClick={() => {
							f7router.back();
						}}
						className="h-7 z-50 relative"
					/>

					<ArrowRightOnRectangleIcon
						onClick={() => {
							signOut(auth).then(() => {
								f7router.navigate("/", { clearPreviousHistory: true });
							});
						}}
						className="h-6 z-50"
					/>
				</div>
				<h1 className="absolute z-10 my-0 w-full text-center left-0 top-4 text-lg font-semibold block p-0">
					{" "}
					Profile{" "}
				</h1>
			</nav>
			<div className="p-4">
				<div className="flex gap-4 items-center">
					<div className=" bg-blue-200 text-primary p-4 h-max aspect-square rounded-full w-max">
						<UserIcon className="h-10" />
					</div>
					<div className="flex flex-col justify-center font-semibold w-full">
						<h2 className="text-xl">{user?.name}</h2>

						<p className="text-zinc-500">@{user?.username}</p>
					</div>
					<div className="w-6">
						<ArrowUpOnSquareIcon className="h-6" />
					</div>
				</div>

				<div className="border mt-5 border-primary rounded p-4 font-semibold text-primary">
					<h2>Wallet Link</h2>
					<div className="flex items-center justify-between">
						<p className="text-zinc-500">Linked from MetaMask</p>
						<CheckBadgeIcon className="text-amber-500 h-5" />
					</div>
					<div className="text-primary bg-blue-100 rounded mt-4 p-4">
						<div className="flex justify-between">
							<p className="">{user?.uid}</p>
							<DocumentDuplicateIcon className="h-6" />
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Settings;
