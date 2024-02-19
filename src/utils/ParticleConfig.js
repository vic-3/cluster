import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { Ethereum } from "@particle-network/chains";
import Web3 from "web3";

const particle = new ParticleNetwork({
  projectId: import.meta.env.VITE_PROJECT_ID,
  clientKey: import.meta.env.VITE_CLIENT_KEY,
  appId: import.meta.env.VITE_APP_ID,
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

export default particle