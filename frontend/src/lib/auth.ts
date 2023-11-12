import { eraseCookie, getCookie, setCookie } from "./cookie";
import { User } from "./types";
import { getUrlAPI } from "./utils";

export async function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  var succes = false;

  const jwt = await fetch(`${getUrlAPI()}/api/Authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

  if (!jwt) {
    return false;
  }

  if (jwt.token) {
    const token = jwt.token;

    setCookie({ name: "jwtToken", value: token, days: 1 });

    succes = true;
  }

  return succes;
}

export async function logout() {
  eraseCookie("jwtToken");
  window.location.href = "/";
}

export async function getUser() {
  const jwtToken = getCookie("jwtToken");

  if (!jwtToken) {
    return null;
  }

  const payload = JSON.parse(atob(jwtToken.split(".")[1]));

  console.log(payload);

  const userBody = await fetch(`${getUrlAPI()}/api/User/${payload.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then((res) => res.json());

  if (!userBody || !userBody.id) {
    return null;
  }

  const userAuth: User = {
    id: userBody.id,
    username: userBody.username,
    email: userBody.email,
    role: userBody.role,
    firstName: userBody.firstName,
    lastName: userBody.lastName,
    token: jwtToken,
  };

  return userAuth;
}
