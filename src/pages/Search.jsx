import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, Tab } from "framework7-react";
import CategoryCard from "../components/Cards/CategoryCard";

const Search = () => {
	return (
		<Tab id="search" className="page-content pb-72">
			<div className="flex justify-between items-center p-4">
				<h1 className=" text-3xl font-semibold">Search</h1>
				<Link href='/settings' className="rounded-full bg-zinc-800 p-2">
					<UserIcon className="h-5" />
				</Link>
			</div>
			<div className="p-4 pt-0 relative">
				<input
					placeholder="Search"
					className="w-full py-2 px-4 text-base rounded-md font-medium bg-zinc-800 placeholder:text-zinc-600"
				/>
				<div className="absolute top-2 right-7 bg-zinc-800">
					<MagnifyingGlassIcon className="h-6 text-zinc-600" />
				</div>
			</div>
			<div className="grid grid-cols-1 p-4 pt-0 gap-4">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
					<CategoryCard key={i} />
				))}
			</div>
		</Tab>
	);
};

export default Search;
