import { postJson, getJson } from './APIutils';

export function loginRequest(loginRequest) {
    return postJson("/api/login", loginRequest);
}

export function registerRequest(registerRequest) {
    return postJson("/api/register", registerRequest);
}

export function checkTokenRequest(checkTokenRequest) {
    return postJson("/api/check-token", checkTokenRequest);
}

export function currentUserRequest(token) {
    return getJson("/api/users/me", token);
}

export function userDataRequest(token, id) {
    return getJson("/api/users/" + id, token);
}