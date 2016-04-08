import Ember from 'ember';
import MuAuthorizationUserMixinMixin from '../../../mixins/mu-authorization-user-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mu authorization user mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MuAuthorizationUserMixinObject = Ember.Object.extend(MuAuthorizationUserMixinMixin);
  let subject = MuAuthorizationUserMixinObject.create();
  assert.ok(subject);
});
