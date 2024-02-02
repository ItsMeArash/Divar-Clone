import api from "configs/api";
import { getCookie } from "src/utils/cookie";

const token = getCookie("accessToken");

const getProfile = api.get("/user/whoami");

export { getProfile };
