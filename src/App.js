import Projects from "./projects.json";
import "./App.css";
import {
  TezosOperationType,
  ErrorResponse,
  DAppClient,
  NetworkType,
} from "@airgap/beacon-sdk";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import CardContainer from "./Components/CardContainer";
import Modal from "./Components/Modal";
import { useEffect, useState } from "react";

const client = new DAppClient({
  name: "Test Request",
  preferredNetwork: NetworkType.EDONET,
});

function App() {
  //tz2JxQqaMMZRGarvE8nBKrvnZFtGUZP6BurD arranaaa wallet

  const [user, setUser] = useState({});
  const [projects, setProjects] = useState(Projects);
  const [activeProject, setActiveProject] = useState({});

  useEffect(() => {
    let retrievedUserInfo = JSON.parse(
      localStorage.getItem("beacon:user-json")
    );

    if (Object.keys(retrievedUserInfo).length > 0) {
      setUser(retrievedUserInfo);
    }
  }, []);

  const login = async () => {
    await client
      .requestPermissions({
        network: {
          type: NetworkType.EDONET,
          rpcUrl: "https://testnet-tezos.giganode.io",
        },
      })
      .then((response) => {
        console.log(response);
        setUser(response.accountInfo);
        localStorage.setItem(
          "beacon:user-json",
          JSON.stringify(response.accountInfo)
        );
      });
  };

  const logout = async () => {
    await client.removeAllAccounts();
    setUser({});
  };

  const donate = async (donation, project) => {
    let obj = {
      kind: TezosOperationType.TRANSACTION,
      amount: donation * 1000000,
      destination: project.wallet,
    };

    await client
      .requestOperation({
        operationDetails: [obj],
      })
      .then((response) => console.log(response));
  };

  console.log(projects);

  return (
    <div className="app">
      {Object.keys(activeProject).length > 0 && (
        <Modal
          setActiveProject={setActiveProject}
          project={activeProject}
          donate={donate}
        />
      )}
      <Navbar login={login} logout={logout} user={user} />
      <Header></Header>
      <CardContainer
        user={user}
        projects={projects}
        setActive={setActiveProject}
      ></CardContainer>
    </div>
  );
}

export default App;

//Each project gets their own state
// if pending show a loading state
// if accepted show good
//
