import { AppState } from "store";

export const loaderSelector = (state: AppState) => state.loader;

export const studioSelector = (state: AppState) => state.studio;

export const authSelector = (state: AppState) => state.auth;

export const userSelector = (state: AppState) => state.user;

export const cvInformationSelector = (state: AppState) => state.cvInformation;

export const jdInformationSelector = (state: AppState) => state.jdInformation;

export const jobListSelector = (state: AppState) => state.jobList;

export const avatarListSelector = (state: AppState) => state.avatarList;
