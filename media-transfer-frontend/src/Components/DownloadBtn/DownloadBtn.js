import React, { useEffect, useState, useRef } from "react";
import { commonApiCongurations } from "../../Assets/ApiReferences";

export const DownloadBtn = ({ btnText, downloadAsZip, contentName, directoryPath }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadBtnRef = useRef(null);
  const handleDownloadItem = ({ selectedItem }) => {
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
        console.log({response})
        return response.blob();
      })
      .then((blob) => {
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
    if (isDownloading)
      downloadBtnRef.current.classList.add("disabled-download");
    else downloadBtnRef.current.classList.remove("disabled-download");
  }, [isDownloading]);

  return (
    <>
      <div ref={downloadBtnRef} className="download-btn">
        <span
          onClick={() =>
            handleDownloadItem({
              selectedItem: contentName,
            })
          }
        >
          {isDownloading ? "Downloading" : btnText}
        </span>
      </div>
    </>
  );
};
