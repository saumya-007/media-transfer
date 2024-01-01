import React from "react";
import "./UploadedFileDisplay.css";
import { fileTypeMapping } from "../../Assets/FileTypeMapping";

export const UploadedFileDisplay = ({ file, fileIndex, removeFile }) => {
  return (
    <div className="file-display">
      <div className="file-type-icon">
        {file.type?.split("/")[1] && fileTypeMapping[file.type?.split("/")[1]]
          ? fileTypeMapping[file.type?.split("/")[1]]
          : fileTypeMapping.default}
      </div>
      <div className="file-type-name">{file.name}</div>
      <div className="file-type-icon" onClick={() => removeFile(fileIndex)}>
        {fileTypeMapping.closeBtn}
      </div>
    </div>
  );
};
