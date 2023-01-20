import {STORE_INFO} from "../constants/constants";


export const StoreInfo = (data: StoreInfo) => {
  return {
    type: STORE_INFO,
    storeInfo: data
  }
}
