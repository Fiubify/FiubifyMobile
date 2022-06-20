import Constants from 'expo-constants';

export const BASE_URL = Constants.manifest.extra.BASE_URL

export const userMetricsUrl = `${BASE_URL}/metrics/users/events`;
export const loginAction = "Login";
export const signupAction = "Signup";
export const passwordAction = "Password";
export const federatedTypeAction = "Federated";
export const emailTypeAction = "Email";
export const resetTypeAction = "Reset";

export const contentMetricsUrl = `${BASE_URL}/metrics/contents/events`;
export const creationAction = "Creation";
export const listenedAction = "Listened";
