import { useEffect, useRef, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { DargAndDrop } from "../DragAndDrop/DargAndDrop";
import { Listing } from "../Listing/Listing";
import { UploadedFileList } from "../UploadedFileList/UploadedFileList";
import { commonApiCongurations } from "../../Assets/ApiReferences";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [directoryPath, setDirectoryPath] = useState("");
  const [fixedDirectoryPath, setFixedDirectoryPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const [directoryContents, setDirectoryContents] = useState([]);
  const [isDirectoryListUpdated, setIsDirectoryListUpdated] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const uploadBtnRef = useRef(null);

  useEffect(() => {
    fetch(
      `http://${commonApiCongurations.host}:${commonApiCongurations.port}/directory/getRootDirectory`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setDirectoryPath(result.data);
          setFixedDirectoryPath(result.data);
        } else {
          console.log({ api_error: result.message });
          toast.error(result.message ? result.message : "Api Error !");
        }
      });
  }, []);

  useEffect(() => {
    if (directoryPath.length) {
      fetch(
        `http://${commonApiCongurations.host}:${commonApiCongurations.port}/directory/getDirectoryContents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            directory_path: directoryPath,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            setDirectoryContents(result.data);
          } else {
            console.log({ api_error: result.message });
            toast.error(result.message ? result.message : "Api Error !");
          }
        });
    }
  }, [directoryPath, isDirectoryListUpdated, fileList]);

  const uploadAttachments = () => {
    if (fileList.length) {
      const subFolderPath = directoryPath
        .replace(fixedDirectoryPath, "")
        .replace("/", "");
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("data_stored_at", subFolderPath);
      console.log({ subFolderPath });
      setUploadLoader(true);
      fetch(
        `http://${commonApiCongurations.host}:${commonApiCongurations.port}/media/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            setFileList([]);
            toast.success(result.data ? result.data : "Done");
            setUploadLoader(false);
          } else {
            console.log({ api_error: result.message });
            toast.error(result.message ? result.message : "Api Error !");
            setUploadLoader(false);
          }
        });
    }
  };

  useEffect(() => {
    if (fileList.length !== 0) {
      uploadBtnRef.current.classList.remove("disable-item");
    } else {
      uploadBtnRef.current.classList.add("disable-item");
    }
  }, [fileList]);

  return (
    <>
      <div className="container-wrapper">
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={true}
          newestOnTop={false}
          theme="colored"
          closeButton={false}
          className="wrapper-text-center" 
        />
        <div className="container">
          <div className="box-wrapper">
            <DargAndDrop
              fileList={fileList}
              setFileList={setFileList}
              uploadLoader={uploadLoader}
            />
          </div>
          <div className="box-wrapper">
            <UploadedFileList fileList={fileList} setFileList={setFileList} />
            <div
              ref={uploadBtnRef}
              onClick={uploadAttachments}
              className="upload-btn"
            >
              Upload selected items
            </div>
          </div>
        </div>
        <div className="container">
          <div className="box-wrapper">
            <Listing
              directoryPath={directoryPath}
              setDirectoryPath={setDirectoryPath}
              fixedDirectoryPath={fixedDirectoryPath}
              directoryContents={directoryContents}
              setIsDirectoryListUpdated={setIsDirectoryListUpdated}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
