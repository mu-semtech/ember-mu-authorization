import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
    name: DS.attr('string'),
    userGroups: DS.hasMany('user-group', {
	async: true
    }),
    grants: DS.hasMany('grant', {
	async: true
    })
});
