import axios, {AxiosResponse} from 'axios';
import {APIReqType, ReqLogin} from "./api-types";
import Util from "./Util";
import {TOKEN_EXPIRE} from "../constants/constant";

const API_URL_DEV = 'http://pos.homekling.com';
const API_URL_PRD = 'http://pos.homekling.com';
const IS_DEV = process.env.NODE_ENV !== 'production';
const API_URL = IS_DEV ? API_URL_DEV : API_URL_PRD;

class API {


  async login(loginId: string, password: string) {
    const action = 'LogIn';
    const path = 'staff/R';

    const reqData: APIReqType<ReqLogin> = {
      action,
      data: {id: loginId, passwd: password},
    };

    const {data: res} = (await this.request(path, reqData)) ?? {};
    Util.setToken(res?.token)
  }


  async request(path: string, data: any) {
    try {
      const res = await axios.request({
        url: `${API_URL}/${path}`,
        method: 'POST',
        data,
      });
      const {
        error_msg,
        data: resData,
        total_count: totalCount = 0,
      } = res.data;

      if (!error_msg) {

        return {data: resData, totalCount};

      } else {
        if (error_msg === TOKEN_EXPIRE) {
          await Util.logout()
        }
        return {data, totalCount: 0, error_msg};
      }

    } catch (error) {
      // @ts-ignore
      if (error?.isAxiosError && error?.response?.status === 401) {
        return null;
      }
      // @ts-ignore
      console.log('Error::', error.message);
      throw error;
    }
  }
}

export default API;
