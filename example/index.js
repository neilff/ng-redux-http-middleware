import angular from 'angular';

import ngRedux from 'ng-redux';
import * as redux from 'redux';
import createLogger from 'redux-logger';
import ngHttpMiddleware from '../src';
import http from '../src/http-state-reducer';

import {RESOURCE_SUCCESS} from '../src/http-actions';
import { Map, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  data: {}
});

/**
 * Reducer of RESOURCE actions. Returns a state object
 * with { currentState, currentParams, prevState, prevParams }
 *
 * @param  {Object} state - Previous state
 * @param  {Object} action - Action
 * @return {Object} New state
 */
function resource(state = INITIAL_STATE, action) {
  switch(action.type) {
    case RESOURCE_SUCCESS:
      return state.mergeDeep({
        data: fromJS(action.payload)
      });
    default:
      return state;
  };
}

class DefaultController {
  constructor($ngRedux, httpActions) {
    this.httpActions = httpActions;
    this.httpState = {};
    this.resourceResult = {};

    $ngRedux.connect(state => state, state => {
      this.httpState = state.http;
      this.resourceResult = state.resource;
    });
  }

  makeRequest() {
    this.httpActions.fetchResource();
  }

  noop() {
    this.httpActions.noop();
  }
};

DefaultController.$inject = ['$ngRedux', 'httpActions'];

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const reducers = redux.combineReducers({
  http,
  resource
});

export default angular
  .module('demoApp', [
    ngRedux,
    ngHttpMiddleware
  ])
  .controller('DefaultController', DefaultController)
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(reducers, ['httpMiddleware', logger]);
  })
  .name;
