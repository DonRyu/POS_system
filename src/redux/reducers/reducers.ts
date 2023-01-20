import {
  STORE_INFO
} from '../constants/constants'

import {StoreInfo} from "../actions/actions";


const initState = {
  storeInfo: [] as StoreInfo[]
}


const reducers = (state: any = initState, action: any) => {
  switch (action.type) {
    case STORE_INFO:
      return {
        ...state,
        storeInfo: action.storeInfo
      }
    default:
      return state;
  }
}

export default reducers;
