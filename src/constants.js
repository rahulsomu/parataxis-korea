import moment from "moment";

export const API_BASE_URL =
  "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api";

export const pressApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisPress?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};
export const dashboardPressGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisPressv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const publicDisclosuresApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisPublicFSCDisclosures?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const dashboardPublicDisclosuresGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisPublicFSCDisclosuresv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const ElectronicDisclosuresApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisPublicElectronicDisclosures?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};
export const dashboardElectronicDisclosuresGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisPublicElectronicDisclosuresv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const mediaApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisMedia?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const dashboardMediaGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisMediav2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const webcastsApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisWebcastsAndPresentations?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const dashboardWebcastsGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisWebcastsAndPresentationsv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const adminLoginApiUrl = `${API_BASE_URL}/Auth/login`;

export const pressDataApiUrl = `${API_BASE_URL}/v2/ParataxisPressV2`;
export const publicDisclosuresDataApiUrl = `${API_BASE_URL}/v2/ParataxisPublicFSCDisclosuresV2`;
export const electronicNoticesDataApiUrl = `${API_BASE_URL}/v2/ParataxisPublicElectronicDisclosuresV2`;

export const webcastsDataApiUrl = `${API_BASE_URL}/v2/ParataxisWebcastsAndPresentationsV2`;
export const mediaDataApiUrl = `${API_BASE_URL}/v2/ParataxisMediaV2`;
export const saveEmail = `${API_BASE_URL}/ParataxisPopupEmail/SaveEmail`;

export const pressInitialState = {
  date: moment().format("MM-DD-YYYY"),
  imgUrl: "",
  heading: "",
  fullDescription: "",
  koreanHeading: "",
  koreanDescription: "",
  ID: "",
  downloadLink1: {
    index: 1,
    fileName: "",
    downloadUrl: "",
  },
  downloadLink2: {
    index: 2,
    fileName: "",
    downloadUrl: "",
  },
  downloadLink3: {
    index: 3,
    fileName: "",
    downloadUrl: "",
  },
};

export const mediaInitialState = {
  date: moment().format("MM-DD-YYYY"),
  thumbnail: "",
  heading: "",
  fullDescription: "",
  koreanHeading: "",
  koreanDescription: "",
  id: "",
  mediaUrl: "",
};
