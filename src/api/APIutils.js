const API_BASE_URL = "https://private-leagues-api.herokuapp.com";

const request = options => {
  const opt = {...options}
  opt.headers = { "Content-Type": "application/json", "Authorization" : options.auth };
  
  return fetch(options.url, opt)
    .then(response => {
      if (response.status === 204) return {};
      return response.json();
    })
    .catch(error => {
      console.log(error)
      return error.json();
    });
};

export function postJson( url, postRequest) {
  return request({
    url: API_BASE_URL + url,
    method: "POST",
    body: JSON.stringify(postRequest)
  })
}

export function getJson( url, token ) {
  return request({
    url: API_BASE_URL + url,
    method: "GET",
    auth: 'Bearer ' + token
  })
}

export function deleteRequest( url, token ) {
  return request({
    url: API_BASE_URL + url,
    method: "DELETE",
    auth: 'Bearer ' + token
  })
}

export function patchRequest( url, token, newData ) {
  return request({
    url: API_BASE_URL + url,
    method: "PATCH",
    auth: 'Bearer ' + token,
    body: JSON.stringify(newData)
  })
}