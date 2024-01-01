import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faMusic,
  faVideo,
  faFileZipper,
  faImage,
  faCircleXmark,
  faFolder
} from "@fortawesome/free-solid-svg-icons";

export const fileTypeMapping = {
  default: <FontAwesomeIcon icon={faFile} />,
  mp3: <FontAwesomeIcon icon={faMusic} />,
  mp4: <FontAwesomeIcon icon={faVideo} />,
  mov: <FontAwesomeIcon icon={faVideo} />,
  mkv: <FontAwesomeIcon icon={faVideo} />,
  zip: <FontAwesomeIcon icon={faFileZipper} />,
  jpeg: <FontAwesomeIcon icon={faImage} />,
  jpg: <FontAwesomeIcon icon={faImage} />,
  png: <FontAwesomeIcon icon={faImage} />,
  closeBtn: <FontAwesomeIcon icon={faCircleXmark} />,
  folder: <FontAwesomeIcon icon={faFolder} />
};