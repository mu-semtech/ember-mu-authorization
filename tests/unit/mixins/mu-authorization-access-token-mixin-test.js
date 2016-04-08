import Ember from 'ember';
import MuAuthorizationAccessTokenMixinMixin from '../../../mixins/mu-authorization-access-token-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mu authorization access token mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MuAuthorizationAccessTokenMixinObject = Ember.Object.extend(MuAuthorizationAccessTokenMixinMixin);
  let subject = MuAuthorizationAccessTokenMixinObject.create();
  assert.ok(subject);
});
