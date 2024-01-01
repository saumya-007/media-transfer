import React, { useRef } from "react";
import "./DirectoryContentListingComponent.css";
import { fileTypeMapping } from "../../Assets/FileTypeMapping";
import { DownloadBtn } from "../DownloadBtn/DownloadBtn";

export const DirectoryContentListingComponent = ({
  directoryContent,
  setDirectoryPath,
  directoryPath,
}) => {
  const directoryNameWrapper = useRef(null);

  let directoryContentIcon = fileTypeMapping.default;
  if (directoryContent.is_directory)
    directoryContentIcon = fileTypeMapping.folder;
  else {
    if (fileTypeMapping[directoryContent.extension])
      directoryContentIcon = fileTypeMapping[directoryContent.extension];
  }

  const highlightDirectory = () => {
    if (directoryContent.is_directory)
      directoryNameWrapper.current.classList.add("hoverover");
  };
  const revertHighlightDirectory = () => {
    if (directoryContent.is_directory)
      directoryNameWrapper.current.classList.remove("hoverover");
  };

  const changeDirectory = () => {
    if (directoryContent.is_directory) {
      setDirectoryPath((prevState) => `${prevState}/${directoryContent.name}`);
    }
  };

  return (
    <div className="directory-content">
      <div className="directory-content-icon">{directoryContentIcon}</div>
      <div className="directory-content-name">
        <p
          ref={directoryNameWrapper}
          onClick={changeDirectory}
          onMouseEnter={highlightDirectory}
          onMouseLeave={revertHighlightDirectory}
          className="directory-name-wrapper"
        >
          {directoryContent.name}
        </p>
      </div>
      <div className="directory-content-options">
        {/*

        Temp fix - not giving ablity to download normal files as zip 
        
        {directoryContent.extension !== "zip" ? (
          <DownloadBtn
            btnText={"Download Zip"}
            downloadAsZip={true}
            contentName={directoryContent.name}
            directoryPath={directoryPath}
          />
        ) : (
          <></>
        )} */}

        {!directoryContent.is_directory ? (
          <DownloadBtn
            btnText={"Download File"}
            downloadAsZip={false}
            contentName={directoryContent.name}
            directoryPath={directoryPath}
          />
        ) : (
          // <></> Temp fix - not giving ablity to download normal files as zip (Remove code below after solving the issue)
          <DownloadBtn
            btnText={"Download Zip"}
            downloadAsZip={true}
            contentName={directoryContent.name}
            directoryPath={directoryPath}
          />
        )}
      </div>
    </div>
  );
};
