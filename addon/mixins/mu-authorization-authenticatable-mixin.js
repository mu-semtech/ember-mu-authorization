import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
    title: DS.attr('string')
});
