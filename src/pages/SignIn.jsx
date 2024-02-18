import { signInWithEmailAndPassword } from "firebase/auth";
import { Input, Page, Progressbar } from "framework7-react";
import { useContext, useEffect, useState } from "react";
import { DB } from "../contexts/DBContext";

const SignIn = ({ f7router }) => {
	const { auth, user } = useContext(DB);

	useEffect(() => {
		user && f7router.navigate("/home", { clearPreviousHistory: true });
	}, [user]);

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);
	return (
		<Page
			pageContent={false}
			className=" flex flex-col justify-center items-center h-full w-full gap-4 "
		>
			{loading && <Progressbar infinite className="w-full" />}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setLoading(true);
					signInWithEmailAndPassword(auth, email, password).then(() => {
						setLoading(false);
						f7router.navigate("/home", { clearPreviousHistory: true });
					});
				}}
				className="px-4 w-full flex flex-col gap-6"
			>
				<div className="mb-10 ">
					<h2 className="text-3xl font-bold text-primary">Login</h2>
					<hr className="border-2 w-10 border-primary mt-2" />
				</div>
				<div className="flex-col">
					<label className="font-medium text-primary">Email</label>
					<Input
						className="px-4 py-2 w-full bg-zinc-200 rounded placeholder:text-zinc-600"
						placeholder="example@email.com"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex-col">
					<label className="font-medium text-primary">Password</label>
					<Input
						className="px-4 py-2 w-full bg-zinc-200 rounded placeholder:text-zinc-600"
						placeholder="******"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className="w-full bg-primary py-3 font-semibold rounded text-zinc-100">
					Login
				</button>
			</form>
		</Page>
	);
};

export default SignIn;
