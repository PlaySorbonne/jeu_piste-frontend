import Cookies from "js-cookie";

function isConnectedFront() {
  return !!Cookies.get("session");
}

const cookieWrapper = {
  isConnected: isConnectedFront,
};

export default cookieWrapper;
