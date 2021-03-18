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
import HistorySidebar from "./Components/HistorySidebar";
import { useEffect, useState } from "react";

const client = new DAppClient({
  name: "Test Request",
  preferredNetwork: NetworkType.EDONET,
});

function App() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState(Projects);
  const [activeProject, setActiveProject] = useState({});
  const [completedDonations, setCompletedDonations] = useState([]);
  const [sideBar, setSidebar] = useState(false);

  useEffect(() => {
    const localStorageRetrieval = () => {
      let retrievedUserInfo = localStorage.getItem("beacon:accounts");

      let retrievedDonations = localStorage.getItem("beacon:donations");

      if (retrievedDonations !== null) {
        setCompletedDonations(JSON.parse(retrievedDonations));
      }

      if (retrievedUserInfo !== "undefined" && retrievedUserInfo !== null) {
        retrievedUserInfo = JSON.parse(retrievedUserInfo);
        setUser(retrievedUserInfo[0]);
      }
    };

    localStorageRetrieval();
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
      })
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    await client.removeAllAccounts();
    localStorage.removeItem("beacon:donations");
    setUser({});
    setCompletedDonations([]);
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

  const updateProjects = (data, state, hash = null, project = null) => {
    const index = [...projects].findIndex((project) => project.id === data.id);
    const projectsCopy = [...projects];

    if (state === "applied") {
      updateDonations(data, project);
    }

    projectsCopy[index].status = state;
    if (hash) {
      projectsCopy[index].recentHash = hash;
    }
    setProjects(projectsCopy);
  };

  const updateDonations = (project, state) => {
    // If status comes back + applied we have to update the current donations + if not,
    const donationsData = [...completedDonations];

    donationsData.push({
      name: project.projectName,
      icon: project.icon,
      timestamp: state[0].timestamp,
      amount: state[0].amount / 1000000,
    });

    localStorage.setItem("beacon:donations", JSON.stringify(donationsData));

    setCompletedDonations(donationsData);
  };

  return (
    <div className="app">
      {sideBar && (
        <HistorySidebar
          setSidebar={setSidebar}
          donations={completedDonations}
        />
      )}
      {Object.keys(activeProject).length > 0 && (
        <Modal
          setActiveProject={setActiveProject}
          project={activeProject}
          donate={donate}
        />
      )}
      <Navbar
        login={login}
        logout={logout}
        user={user}
        sideBar={sideBar}
        setSidebar={setSidebar}
      />
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
