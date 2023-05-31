import { useSearchParams } from "react-router-dom";
import { setTokenInLocalStorage } from "../lib/authUtils";

function OAuthRedirect() {

    const [param] = useSearchParams();
    // console.log(param.get("token"));
    setTokenInLocalStorage(param.get("token"), param.get("expires"));
    // window.location.reload();
    // console.log("here");
    // redirect();
    window.open("http://localhost:5000/", "_self");
}

export default OAuthRedirect;
