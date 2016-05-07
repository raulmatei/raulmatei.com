import 'babel-polyfill';
import frux from 'frux';
import * as main from './src/main';

global.app = {
  ...main,
  serialize: frux.serialize
};