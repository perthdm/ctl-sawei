import { API_ENDPOINT } from "../utils/utility";
import axios from "axios";

const ENDPOINT = {
  GET_MENU: `${API_ENDPOINT}/menu`,
};

const MainService = {
  getMenu: () => {
    return axios({ method: "GET", url: ENDPOINT.GET_MENU });
  },
};

export default MainService;
