import axios from 'axios';
const RequestService = {

  save (url, data) {
    return RequestService.request('post', url, data);
  },

  request: (method, url, data) => {
    return axios({
      method,
      url,
      data
    });
  }
};

export default RequestService;
