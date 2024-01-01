import React, {  useState } from "react";
import "./Listing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { DirectoryContentListingComponent } from "../DirectoryContentListingComponent/DirectoryContentListingComponent";
import { PathDisplay } from "../PathDisplay/PathDisplay";
import { commonApiCongurations } from "../../Assets/ApiReferences";

export const Listing = ({
  directoryPath,
  setDirectoryPath,
  fixedDirectoryPath,
  directoryContents,
  setIsDirectoryListUpdated,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [folderName, setFolderName] = useState("");

  const toggleShowInput = () => {
    setShowInput((prevState) => !prevState);
  };

  const handleTextInput = (e) => {
    setFolderName(e.target.value);
  };

  const createFolder = () => {
    if (folderName.length) {
      fetch(
        `http://${commonApiCongurations.host}:${commonApiCongurations.port}/directory/makeDirectory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            location: directoryPath,
            folder_name: folderName,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status !== "success") {
            console.log({ api_error: result.message });
          } else {
            setIsDirectoryListUpdated((prevState) => !prevState);
            toggleShowInput();
          }
        });
    } else {
      console.log({ validaion_error: "Folder Name can not be empty" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createFolder();
      console.log("Enter pressed");
    }
    if (e.key === "Escape") {
      toggleShowInput();
    }
  };

  // This code is repeated their has to be a better way - Follow DRY

  return (
    <div className="listing-wrapper">
      <div className="listing-header">
        {showInput ? (
          <>
            <div className="input-wrapper">
              <input
                className="folder-name-input"
                onChange={handleTextInput}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div onClick={toggleShowInput}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </div>
              <label> "Press Enter to create or Esc to exit" </label>
            </div>
          </>
        ) : (
          <div className="create-btn-display" onClick={toggleShowInput}>
            Create new folder
          </div>
        )}
        <div> Location : </div>
        <div className="path-display">
          {directoryPath
            .replace(fixedDirectoryPath, "root")
            .split("/")
            .map((directoryName, indexOfDirectory) => {
              return (
                <PathDisplay
                  key={directoryName + Math.random()}
                  fixedDirectoryPath={fixedDirectoryPath}
                  directoryPath={directoryPath}
                  indexOfDirectory={indexOfDirectory}
                  directoryName={directoryName}
                  setDirectoryPath={setDirectoryPath}
                />
              );
            })}
        </div>
      </div>
      <div className="listing-body">
        {directoryContents.map((content) => (
          <DirectoryContentListingComponent
            key={content.name}
            setDirectoryPath={setDirectoryPath}
            directoryContent={content}
            directoryPath={directoryPath}
          />
        ))}
      </div>
    </div>
  );
};
