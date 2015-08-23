import * as redux from 'redux';
import {CALL_API} from '../src/http-middleware';

export const RESOURCE_REQUEST = '@@reduxNgHttpMiddleware/resourceRequest';
export const RESOURCE_SUCCESS = '@@reduxNgHttpMiddleware/resourceSuccess';
export const RESOURCE_FAILURE = '@@reduxNgHttpMiddleware/resourceFailure';

/**
 * Fetch the external resource
 */
export function fetchResource() {
  return {
    [CALL_API]: {
      types: [RESOURCE_REQUEST, RESOURCE_SUCCESS, RESOURCE_FAILURE],
      endpoint: `json/example-data.json`
    }
  };
}

export function noop() {
  return {
    type: 'NOOP',
    payload: {}
  };
}

export default function httpActions($ngRedux) {
  let actionCreator = {
    fetchResource,
    noop
  };

  return redux.bindActionCreators(actionCreator, $ngRedux.getStore().dispatch);
}

httpActions.$inject = ['$ngRedux'];
