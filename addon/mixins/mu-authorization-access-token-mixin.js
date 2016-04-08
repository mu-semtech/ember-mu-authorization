import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
    name: DS.attr('string'),
    description: DS.attr('string')
});
