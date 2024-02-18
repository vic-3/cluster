import {
	CheckBadgeIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/react/20/solid";
import { Link, Tab } from "framework7-react";
import { useContext } from "react";
import "swiper/css";
import { DB } from "../contexts/DBContext";

const Home = () => {
	const { users, user } = useContext(DB);

	return (
		<Tab id="home" className="page-content pb-20" tabActive>
			<div className="flex justify-between items-center p-4 text-zinc-600 sticky top-0 bg-zinc-100 z-50">
				<h1 className=" text-2xl font-semibold">Messages</h1>
				<Link
					href="/settings"
					className="rounded-full bg-blue-200 text-primary p-2"
				>
					<UserIcon className="h-5" />
				</Link>
			</div>
			<div className="p-4 py-0 relative">
				<input
					placeholder="Search"
					className="w-full py-2 pr-4 pl-12 text-base rounded-md font-medium bg-zinc-200 placeholder:text-zinc-600"
				/>
				<div className="absolute top-2 left-7 bg-zinc-200">
					<MagnifyingGlassIcon className="h-6 text-zinc-600" />
				</div>
			</div>
			<ul className="mt-4 flex w-full flex-col">
				{users?.map(
					({ name, about, uid }, i) =>
						uid != user?.uid && (
							<li key={i}>
								<Link
									href={"/chat/" + i}
									className="flex gap-2 w-full py-2 px-4 hover:bg-zinc-200/50 border-b"
								>
									<div className=" bg-blue-200 text-primary p-2 h-max aspect-square rounded-full">
										<UserIcon className="h-8" />
									</div>
									<div className="flex flex-col justify-evenly font-semibold w-full">
										<div className="flex justify-between items-center">
											<h2 className="capitalize">{name}</h2>
											<CheckBadgeIcon className="h-4 text-amber-500" />
										</div>
										<p className="text-zinc-500">{about}</p>
									</div>
								</Link>
							</li>
						)
				)}
			</ul>
		</Tab>
	);
};
export default Home;
