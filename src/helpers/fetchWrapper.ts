import { HttpCodes, type OKApiResponse } from "./constants";
// import userService from "./userService";

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get<T>(url: string) {
  console.info("getting ", url);
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<T>(response);
}

async function post<T>(url: string, body: any) {
  console.info("posting ", url);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<T>(response);
}

async function put<T>(url: string, body: any) {
  console.info("putting ", url);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<T>(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete<T>(url: string) {
  console.info("deleting ", url);
  const requestOptions = {
    method: "DELETE",
  };
  const response = await fetch(url, requestOptions);
  return handleResponse<T>(response);
}

async function handleResponse<T>(
  response: Response
): Promise<OKApiResponse<T>> {
  const text = await response.text();
  let data: any = text && JSON.parse(text);
  if (!response.ok) {
    const error = data.message as string;
    /*
    if (
      [HttpCodes.UNAUTHORIZED, HttpCodes.FORBIDDEN].includes(response.status)
    ) {
      // auto logout if 401 response returned from api
      alert(error);
      console.error(error);
      alert("401/403 error, logging out");

      userService.logout();
      window.location.href = "/login";
    } else {
      alert(error);
    }
      */
    alert(error);
    return Promise.reject(error);
  }
  return data;
}
