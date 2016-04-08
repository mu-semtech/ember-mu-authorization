import Ember from 'ember';
import MuAuthorizationGrantMixinMixin from '../../../mixins/mu-authorization-grant-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mu authorization grant mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MuAuthorizationGrantMixinObject = Ember.Object.extend(MuAuthorizationGrantMixinMixin);
  let subject = MuAuthorizationGrantMixinObject.create();
  assert.ok(subject);
});
