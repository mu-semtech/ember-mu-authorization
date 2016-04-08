import Ember from 'ember';
import MuAuthorizationUserGroupMixinMixin from '../../../mixins/mu-authorization-user-group-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mu authorization user group mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MuAuthorizationUserGroupMixinObject = Ember.Object.extend(MuAuthorizationUserGroupMixinMixin);
  let subject = MuAuthorizationUserGroupMixinObject.create();
  assert.ok(subject);
});
