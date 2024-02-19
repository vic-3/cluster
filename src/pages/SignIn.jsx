import { signInWithEmailAndPassword } from "firebase/auth";
import { Input, Page, Progressbar } from "framework7-react";
import { useContext, useEffect, useState } from "react";
import { DB } from "../contexts/DBContext";
import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { Ethereum } from "@particle-network/chains";
import Web3 from "web3";

const particle = new ParticleNetwork({
  projectId: "9d48ae85-29ee-47d8-bbdd-6bc4d36a1f03",
  clientKey: "cETdYy77KfS68FiLQDabNjXJzzJIjnRSH19AnRgZ",
  appId: "sjUaTvwwLQJIrLrVn1UiihjrvPzQQFGonoFqdeg4",
  chainName: Ethereum.name, //optional: current chain name, default Ethereum.
  chainId: Ethereum.id, //optional: current chain id, default 1.
  wallet: {
    // Configure social login options
    supportChains: [{ id: 1, name: "Ethereum" }], // Only needed for social login
    customStyle: {}, // Optional for styling
  },
  securityAccount: { //optional: particle security account config
    //prompt set payment password. 0: None, 1: Once(default), 2: Always
    promptSettingWhenSign: 1,
    //prompt set master password. 0: None(default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1
  },
});

//const particleProvider = new ParticleProvider(particle.auth);



const SignIn = ({ f7router }) => {
	const { auth, user } = useContext(DB);

	useEffect(() => {
		user && f7router.navigate("/home", { clearPreviousHistory: true });
	}, [user]);

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);

	function handleGoogleLogin() {
		particle.auth.login({ preferredAuthType: "google" })
		  .then((user) => {
			// Handle successful login (store user data, redirect, etc.)
		  })
		  .catch((error) => {
			// Handle login error
		  });
	  }
	  
	  function handleDiscordLogin() {
		particle.auth.login({ preferredAuthType: "discord" })
		  .then((user) => {
			// Handle successful login
		  })
		  .catch((error) => {
			// Handle login error
		  });
	  }
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
				{/* <div className="flex-col">
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
				</div> */}
				<button type='button' className="w-full bg-primary py-3 my-2 font-semibold rounded text-zinc-100" onClick={handleGoogleLogin}>
					Login with google
				</button>

				<button type='button' className="w-full bg-primary py-3 my-2 font-semibold rounded text-zinc-100" onClick={handleDiscordLogin}>
					Login with discord
				</button>
			</form>
		</Page>
	);
};

export default SignIn;
