import {
  SETTINGS_LIST_FAIL,
  SETTINGS_LIST_REQUEST,
  SETTINGS_LIST_SUCCESS,
  SETTINGS_UPDATE_FAIL,
  SETTINGS_UPDATE_REQUEST,
  SETTINGS_UPDATE_SUCCESS,
} from '../constants/settingsConstants';

export const settingsUpdateReducer = (
  state = { categories: { subCategories: [] } },
  action
) => {
  switch (action.type) {
    case SETTINGS_UPDATE_REQUEST:
      return { loading: true };
    case SETTINGS_UPDATE_SUCCESS:
      return { loading: false, success: true, categories: action.payload };
    case SETTINGS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const settingsListReducer = (
  state = { categories: { subCategories: [] } },
  action
) => {
  switch (action.type) {
    case SETTINGS_LIST_REQUEST:
      return { loading: true };
    case SETTINGS_LIST_SUCCESS:
      return { loading: false, success: true, categories: action.payload };
    case SETTINGS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
