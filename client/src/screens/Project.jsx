import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  const project = location.state.project;

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  //   console.log("project", project);
  return (
    <main className="h-screen flex w-screen">
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
        <header className="flex justify-between p-2 px-4 w-full bg-white">
          <button className="flex gap-2 items-center p-2">
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
        <div className="conversation-area flex-grow flex flex-col gap-1">
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
              placeholder="Type a message"
              required
            />
            <button className="px-5 bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all  ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-end p-2 px-5 py-4 bg-slate-200">
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <i className="ri-close-fill font-bold"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2 p-2">
            <div className="user flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2">
              <div className="aspect-square rounded-full w-fit h-fit p-4 flex bg-slate-600 text-white items-center justify-center">
                <i className="ri-user-fill absolute"></i>
              </div>
              <h1 className="font-semibold text-lg">User Name</h1>
            </div>
          </div>
        </div>
      </section>


          


    </main>
  );
};

export default Project;
