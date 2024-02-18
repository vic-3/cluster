import {
	ChevronLeftIcon,
	PaperAirplaneIcon,
	UserIcon,
} from "@heroicons/react/20/solid";
import {
	addDoc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { Link, Page } from "framework7-react";
import { useContext, useEffect, useState } from "react";
import { DB } from "../contexts/DBContext";

const Chat = ({ f7router, f7route }) => {
	const { users, chatsRef, user } = useContext(DB);
	const { id } = f7route.params;

	const { name, about, uid } = users[id];
	const [chats, setChats] = useState();
	const [chat, setChat] = useState();
	const [message, setMessage] = useState();

	useEffect(() => {
		if (user) {
			const q = query(
				chatsRef,
				where("users", "array-contains-any", [uid + user?.uid, user?.uid + uid])
			);
			onSnapshot(q, (snapshot) => {
				if (!snapshot.empty) {
					setChats([...snapshot.docs[0].data().messages]);
					document.getElementById("bottom")?.scrollIntoView();
					setChat(snapshot.docs[0].ref);
				} else {
					console.log("creating...");
					addDoc(chatsRef, {
						users: [user?.uid + uid, uid + user?.uid],
						messages: [],
					}).then((doc) => setChat(doc));
					setChats([]);
				}
			});
		}
	}, [user]);
	return (
		<Page className="bg-zinc-100">
			<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col overflow-hidden">
				<nav className="p-4 bg-zinc-200 text-zinc-600  flex items-center gap-2">
					<ChevronLeftIcon
						onClick={() => {
							f7router.back();
						}}
						className="h-7 relative"
					/>
					<div className="flex gap-2 items-center">
						<Link
							href="/settings"
							className="rounded-full bg-blue-200 text-primary p-2"
						>
							<UserIcon className="h-6" />
						</Link>
						<div className="flex flex-col justify-evenly font-semibold text-sm">
							<h2 className="">{name}</h2>
							<p className="text-zinc-500 text-xs">{about}</p>
						</div>
					</div>
				</nav>
				<div className="h-full overflow-y-auto">
					{chats != undefined && (
						<ul
							className="p-4 flex flex-col gap-2 font-medium text-zinc-600"
						>
							{chats?.map(({ message, sender }, i) => (
								<li
									key={i}
									className={sender == user?.uid ? "sender" : "receiver"}
								>
									{message}
								</li>
							))}
							<li id="bottom" className="mt-10"></li>
						</ul>
					)}
				</div>
				<div className="w-full bg-zinc-100 p-2">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (message) {
								updateDoc(chat, {
									messages: [...chats, { message, sender: user.uid }],
								}).then(() => setMessage(""));
							}
						}}
						className="relative flex gap-2"
					>
						<input
							placeholder="Message..."
							className="w-full py-2 pl-4 pr-12 text-base rounded font-medium bg-zinc-200 placeholder:text-zinc-400"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button className="rounded bg-primary text-zinc-100 p-2 w-max">
							<PaperAirplaneIcon className="h-6" />
						</button>
					</form>
				</div>
			</div>
		</Page>
	);
};

export default Chat;
