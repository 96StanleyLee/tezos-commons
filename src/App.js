import logo from "./logo.svg";
import "./App.css";
import { ErrorResponse, DAppClient, NetworkType } from "@airgap/beacon-sdk";

function App() {
  const client = new DAppClient({ name: "Test Request" });

  const login = async () => {
    await client
      .requestPermissions({
        network: {
          type: NetworkType.EDONET,
          rpcUrl: "https://testnet-tezos.giganode.io/",
        },
      })
      .then((response) => console.log(response));
  };

  return (
    <div className="App">
      <button onClick={login}>"Test"</button>
    </div>
  );
}

export default App;
