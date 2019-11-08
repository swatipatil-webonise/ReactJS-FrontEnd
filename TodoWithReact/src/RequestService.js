import axios from 'axios';

const RequestService = {
  fetch (url, data) {
    return this.request("get", url, data);
  },

  save (url, data) {
    return this.request("post", url, data);
  },

  update (url, data) {
    return this.request("put", url, data);
  },

  delete (url, data) {
    return this.request("delete", url, data);
  },

  request (method, url, data, cancelToken) {
    return axios({
      method,
      url,
      data,
      cancelToken
    });
  }
};

export default RequestService;
