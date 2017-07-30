import * as angular from 'angular';

import {hello} from './app/hello';

import './index.css';

export const app: string = 'app';

angular
  .module(app, [])
  .component('app', hello);
