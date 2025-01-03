import React, { useEffect, useState, useContext } from "react";
import axios from "../config/axios";
import { useLocation } from "react-router-dom";
import { intializeSocket, receiveMessage, sendMessage } from "../config/socket";
import { UserContext } from "../context/user.context";

const Project = () => {
  const location = useLocation();
  // const project = location.state?.project;

  const {user} = useContext(UserContext);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");

  function addCollaborator() {
    console.log("dadata", location.state.project);
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    intializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      console.log(data);
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUserClick = (userId) => {
    console.log(userId);
    if (selectedUserId.includes(userId)) {
      setSelectedUserId(selectedUserId.filter((id) => id !== userId));
    } else {
      setSelectedUserId([...selectedUserId, userId]);
    }
  };

  const sendMessages = () => {
    console.log("message", user);
    sendMessage("project-message", {
      message,
      sender: user._id,
    });
    setMessage("");
  };

  return (
    <main className="h-screen flex w-screen">
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
        <header className="flex justify-between p-2 px-4 w-full bg-white">
          <button
            className="flex gap-2 items-center p-2"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-add-large-fill mr-1"></i>
            <p>Add Collaborator</p>
          </button>
          <button
            className="p-2"
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className="conversation-area flex-grow flex flex-col gap-1 overflow-y-auto">
          <div className="message-box p-1 flex-grow flex flex-col">
            <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit mt-2 rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com </small>
              <p className="text-sm">Lorem ipsum dolor sit.</p>
            </div>

            <div className="ml-auto message max-w-56 flex flex-col p-2 mt-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com </small>
              <p className="text-sm">Lorem ipsum dolor sit.</p>
            </div>
          </div>
          <div className="inputField w-full flex">
            <input
              className="p-2 px-4 border-none outline-none flex-grow"
              type="text"
              value={message}
              placeholder="Type a message"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              className="px-5 bg-slate-950 text-white"
              type="submit"
              onClick={sendMessages}
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all  ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0 overflow-y-auto`}
        >
          <header className="flex justify-between p-2 px-5 py-4 bg-slate-200">
            <h2 className="text-xl font-bold">Collaborators</h2>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <i className="ri-close-fill font-bold"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2 p-2">
            {project?.users?.map((user) => (
              <div
                key={user._id}
                className="user flex items-center gap-2 p-2 rounded-md"
              >
                <i className="ri-user-fill text-xl"></i>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="ri-close-fill text-2xl"></i>
            </button>
            <h2 className="text-2xl font-bold mb-4">Select a User</h2>
            <ul className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {users?.map((user) => (
                <li
                  key={user._id}
                  className={`p-2 rounded cursor-pointer hover:bg-slate-200 ${
                    selectedUserId.includes(user._id) ? "bg-slate-200" : ""
                  }
                     flex items-center gap-2`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <i className="ri-user-fill text-xl"></i>
                  {user.email}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                addCollaborator();
                console.log(`User ${selectedUserId} added as collaborator`);
                setIsModalOpen(false);
              }}
            >
              Add Collaborator
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
