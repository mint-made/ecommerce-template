import axios from 'axios';
import {
  SETTINGS_LIST_REQUEST,
  SETTINGS_LIST_SUCCESS,
  SETTINGS_UPDATE_FAIL,
  SETTINGS_UPDATE_REQUEST,
  SETTINGS_UPDATE_SUCCESS,
} from '../constants/settingsConstants';

export const listSettings = () => async (dispatch) => {
  try {
    dispatch({
      type: SETTINGS_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/settings');

    dispatch({
      type: SETTINGS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SETTINGS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSettings = (settings) => async (dispatch, getState) => {
  console.log(settings);
  try {
    dispatch({
      type: SETTINGS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/settings`, settings, config);

    dispatch({
      type: SETTINGS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SETTINGS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
