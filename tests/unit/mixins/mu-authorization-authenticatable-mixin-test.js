import Ember from 'ember';
import MuAuthorizationAuthenticatableMixinMixin from '../../../mixins/mu-authorization-authenticatable-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | mu authorization authenticatable mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let MuAuthorizationAuthenticatableMixinObject = Ember.Object.extend(MuAuthorizationAuthenticatableMixinMixin);
  let subject = MuAuthorizationAuthenticatableMixinObject.create();
  assert.ok(subject);
});
