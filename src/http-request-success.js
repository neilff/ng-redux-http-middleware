import { HTTP_REQUEST_SUCCESS } from './action-types';

/**
 * This action is triggered when a $http request is successful.
 *
 * https://docs.angularjs.org/api/ng/service/$http
 *
 * @param {Object} response Response object
 * @return {Object} Action object
 */
export default function onHttpRequest(response) {
  return {
    type: HTTP_REQUEST_SUCCESS,
    payload: {
      response
    }
  };
}
