import React, { useEffect, useRef, useState } from "react";
import "./DirectoryContentListingComponent.css";
import { fileTypeMapping } from "../../Assets/FileTypeMapping";
import { commonApiCongurations } from "../../Assets/ApiReferences";

export const DirectoryContentListingComponent = ({
  directoryContent,
  setDirectoryPath,
  directoryPath,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadBtnRef = useRef(null);
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

  const handleDownloadItem = ({ downloadAsZip, selectedItem }) => {
    console.log({
      download_as_zip: downloadAsZip,
      source_path: directoryPath,
    });

    if (isDownloading) return;

    setIsDownloading(true);

    fetch(
      `http://${commonApiCongurations.host}:${commonApiCongurations.port}/media/download`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          download_as_zip: downloadAsZip,
          source_path: [directoryPath, selectedItem].join("/"),
        }),
      }
    )
      .then((response) => {
        console.log("Creating BLob");
        return response.blob();
      })
      .then((blob) => {
        console.log("Creating BLob");
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = selectedItem;
        document.body.appendChild(a);

        // Trigger a click on the link to start the download
        a.click();

        // Remove the link from the DOM
        document.body.removeChild(a);
        setIsDownloading(false);
      })
      .catch((error) => {
        console.error("Error downloading file:", error.message);
        setIsDownloading(false);
      });
  };

  useEffect(() => {
    if (isDownloading) downloadBtnRef.current.classList.add("disabled");
    else downloadBtnRef.current.classList.remove("disabled");
  }, [isDownloading]);

  console.log({ directoryContent });

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
        {directoryContent.extension !== "zip" ? (
          <div ref={downloadBtnRef} className="download-btn">
            <span
              onClick={() =>
                handleDownloadItem({
                  downloadAsZip: true,
                  selectedItem: directoryContent.name,
                })
              }
            >
              {isDownloading ? "Downloading" : "Download Zip"}
            </span>
          </div>
        ) : (
          <></>
        )}

        {!directoryContent.is_directory ? (
          <div ref={downloadBtnRef} className="download-btn">
            <span
              onClick={() =>
                handleDownloadItem({
                  downloadAsZip: false,
                  selectedItem: directoryContent.name,
                })
              }
            >
              {isDownloading ? "Downloading" : "Download File"}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
