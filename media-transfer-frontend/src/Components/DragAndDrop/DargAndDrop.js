import React, { useRef } from "react";
import "./DragAndDrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";

export const DargAndDrop = ({ fileList, setFileList, uploadLoader }) => {
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const fileUploadHandler = (e) => {
    const newFiles = e.target.files;
    if (newFiles && newFiles.length) {
      const updatedList = [...fileList, ...newFiles];
      setFileList(updatedList);
    }
  };

  return (
    <>
      Please add files here !
      <div
        className="drag-n-drop"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {uploadLoader ? (
          <FontAwesomeIcon icon={faArrowRotateRight} size={"4x"} spin />
        ) : (
          <FontAwesomeIcon icon={faCloudArrowUp} size={"4x"} />
        )}
        <input
          className="hide-btn"
          type="file"
          multiple
          onChange={fileUploadHandler}
        />
      </div>
    </>
  );
};
