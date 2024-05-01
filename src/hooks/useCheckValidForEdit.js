import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function useCheckValidForEdit(URLchannelId) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (URLchannelId != user?._id) {
    navigate("/");
    return false;
  }

  return true;
}

export default useCheckValidForEdit;
