import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

import {hello} from './app/hello';
import reducer from './redux/reducer';

import './index.css';

export const app: string = 'app';

angular
  .module(app, [ngMaterial, ngRedux])
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(reducer, [thunk], [window['__REDUX_DEVTOOLS_EXTENSION__']()]);
  })
  .run(($ngRedux, $rootScope, $timeout) => {
    $ngRedux.subscribe(() => {
      $timeout(() => {
        $rootScope.$apply(() => {
        });
      }, 100);
    });
  })
  .component('app', hello);
