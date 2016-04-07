import { moduleForModel, test } from 'ember-qunit';

moduleForModel('mu-authorization-user-group', 'Unit | Serializer | mu authorization user group', {
  // Specify the other units that are required for this test.
  needs: ['serializer:mu-authorization-user-group']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
