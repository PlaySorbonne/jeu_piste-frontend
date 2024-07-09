import cookieWrapper from "./cookieWrapper";
import { fetchWrapper } from "./fetchWrapper";
import Cookies from "js-cookie";
import type { Player } from "./schemas";

const userService = {
  get userId() {
    return getConnectedUser()?.name ?? null;
  },
  login,
  logout,
  register,
  getConnectedUser,
  updateConnectedUser,
};

function getConnectedUser(): Player | null {
  if (!cookieWrapper.isConnected()) return null;
  const user = localStorage.getItem("User");

  if (!user) {
    // nothing in localstorage, maybe refetech ?
    return null;
  }
  let out;

  try {
    out = new APIUser(JSON.parse(user));
  } catch (e: any) {
    alert("Error while parsing user, logging out");
    logout();
    return null;
  }

  return out;
}

async function updateConnectedUser() {
  console.info("Updating connected user");
  if (!cookieWrapper.isConnected()) return;
  let user = getConnectedUser() as APIUser;
  localStorage.setItem(
    "User",
    JSON.stringify(
      (await fetchWrapper.get<UserWithoutPass>(user?.apiLink)).data
    )
  );
}

async function login(email: string, password: string): Promise<void> {
  return await fetchWrapper
    .post<{ session: string; user: UserWithoutPass }>(`${USERAPI}/login`, {
      email,
      password,
    })
    .then((u) => {
      localStorage.setItem("User", JSON.stringify(u.data.user));
      console.info("Logged in !");
      window.location.href = "/";
    });
}

function logout() {
  console.info("Logging out");
  Cookies.remove("session");
  localStorage.removeItem("User");
  window.location.href = "/login";
}

async function register(user: {
  email: string;
  password: string;
  username: string;
  bio?: string;
}): Promise<void> {
  return fetchWrapper.post(`/api/user/register`, user).then(() => {
    window.location.href = "/login";
  });
}
