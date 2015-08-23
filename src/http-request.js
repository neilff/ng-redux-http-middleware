import { HTTP_REQUEST } from './action-types';

/**
 * This action is triggered when a $http request is made.
 *
 * https://docs.angularjs.org/api/ng/service/$http
 *
 * @param {String} route The route we are attempting to hit
 * @param {Object} data Data to be sent with the request
 * @param {Object} config Configuration object
 * @return {Object} Action object
 */
export default function onHttpRequest(route, data, config) {
  return {
    type: HTTP_REQUEST,
    payload: {
      route,
      data,
      config
    }
  };
}
