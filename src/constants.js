export const pressApiUrl = (params) => {
  let url =
    "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api/ParataxisPress?";
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const publicDisclosuresApiUrl = (params) => {
  let url =
    "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api/ParataxisPublicFSCDisclosures?";
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const ElectronicDisclosuresApiUrl = (params) => {
  let url =
    "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api/ParataxisPublicElectronicDisclosures?";
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const mediaApiUrl = (params) => {
  let url =
    "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api/ParataxisMedia?";
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const webcastsApiUrl = (params) => {
  let url =
    "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api/ParataxisWebcastsAndPresentations?";
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};