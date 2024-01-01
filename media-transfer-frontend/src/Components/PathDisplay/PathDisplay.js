import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

export const PathDisplay = ({
    fixedDirectoryPath,
    directoryPath,
    indexOfDirectory,
    directoryName,
    setDirectoryPath,
}) => {

    const directoryNameWrapper = useRef(null);
  const highlightDirectory = () => {
    directoryNameWrapper.current.classList.add("hoverover");
  };
  const revertHighlightDirectory = () => {
    directoryNameWrapper.current.classList.remove("hoverover");
  };

  const changeDirectory = (indexOfDirectory) => {
    const updatedDirectoryListing = directoryPath
      .replace(fixedDirectoryPath, "")
      .split("/")
      .slice(0, indexOfDirectory + 1)
      .join("/");
    setDirectoryPath(fixedDirectoryPath + updatedDirectoryListing);
  };
  return (
    <>
      <span
        ref={directoryNameWrapper}
        onClick={() => changeDirectory(indexOfDirectory)}
        onMouseEnter={highlightDirectory}
        onMouseLeave={revertHighlightDirectory}
      >
        {directoryName}
      </span>
      <FontAwesomeIcon icon={faCaretRight} className="icon-padding" />
    </>
  );
};
