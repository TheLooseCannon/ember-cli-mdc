import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('multipart');

  this.route('issues', function() {
    this.route('6');
    this.route('11');
  });
  this.route('icons');
});
