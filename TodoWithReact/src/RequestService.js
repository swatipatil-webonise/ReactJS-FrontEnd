import axios from "axios";
const RequestService = {
  fetch: (url, data) => {
    return RequestService.request("get", url, data);
  },

  save: (url, data) => {
    return RequestService.request("post", url, data);
  },

  update: (url, data) => {
    return RequestService.request("put", url, data);
  },

  delete: (url, data) => {
    return RequestService.request("delete", url, data);
  },

  request: (method, url, data, cancelToken) => {
    return axios({
      method,
      url,
      data,
      cancelToken
    });
  }
};

export default RequestService;
