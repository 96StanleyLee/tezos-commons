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
  // tz2T6p4kWGHipyZM5sgestddcruRJs17in1F
  //tz2JxQqaMMZRGarvE8nBKrvnZFtGUZP6BurD arranaaa wallet

  const [user, setUser] = useState({});
  const [projects, setProjects] = useState(Projects);
  const [activeProject, setActiveProject] = useState({});

  useEffect(() => {
    const checkUserStorage = () => {
      let retrievedUserInfo = localStorage.getItem("beacon:user-json");

      if (localStorage.getItem("beacon:active-account") === "undefined") {
        localStorage.setItem("beacon:user-json", undefined);
        setUser({});
      } else {
        setUser(JSON.parse(retrievedUserInfo));
      }
    };

    window.addEventListener("storage", checkUserStorage);

    checkUserStorage();
  }, []);

  useEffect(() => {});

  const login = async () => {
    await client
      .requestPermissions({
        network: {
          type: NetworkType.EDONET,
          rpcUrl: "https://testnet-tezos.giganode.io",
        },
      })
      .then((response) => {
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
      .then((response) => {
        updateProjects(project, "pending", response.transactionHash);
        setActiveProject({});
      })
      .catch((err) => console.log(err));
  };

  const updateProjects = (data, state, hash = null) => {
    const index = [...projects].findIndex((project) => project.id === data.id);

    const projectsCopy = [...projects];

    projectsCopy[index].status = state;
    if (hash) {
      projectsCopy[index].recentHash = hash;
    }
    setProjects(projectsCopy);
  };

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
        updateProjects={updateProjects}
      ></CardContainer>
    </div>
  );
}

export default App;

//Each project gets their own state
// if pending show a loading state
// if accepted show good
//
