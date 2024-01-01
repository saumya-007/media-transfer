import React from "react";
import "./UploadedFileList.css";
import { UploadedFileDisplay } from "../UploadedFileDisplay/UploadedFileDisplay";

export const UploadedFileList = ({ fileList, setFileList }) => {

  const removeFile = (index) => {
    setFileList((prevFileList) => {
      const stateClone = [
        ...prevFileList.slice(0, index),
        ...prevFileList.slice(index + 1),
      ];
      return stateClone;
    });
  };

  return (
    <div className="uploaded-file-list">
      {fileList.map((file, index) => {
        return (
          <UploadedFileDisplay
            key={file.name}
            file={file}
            fileIndex={index}
            removeFile={removeFile}
          />
        );
      })}
    </div>
  );
};
