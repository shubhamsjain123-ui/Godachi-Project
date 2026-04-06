import {
  CHANGE_COLLAPSED,
  SWITCH_LANGUAGE,
  GET_SETTINGS,
  GET_ALL_FETCH_FAIL,
  WINDOW_WIDTH
} from "../types";
import { defaultLanguage } from "../../config/config";

const initialSettings = {
  locale: defaultLanguage,
  collapsed: true,
  settings: {},
  width: 1367,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
      };
    case CHANGE_COLLAPSED:
      return {
        ...state,
        collapsed: action.payload,
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case GET_ALL_FETCH_FAIL:
      return {
        ...state,
        errorFetch: action.payload,
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    default:
      return state;
  }
};

export default settings;
