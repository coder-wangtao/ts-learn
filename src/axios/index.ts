import Axios from "./Axios";
function createInstance() {
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);
  return instance;
}

const axios = createInstance();

export default axios;
export * from "./types";
