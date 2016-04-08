import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
    accessTokens: DS.hasMany('access-token', {
	async: true
    }),
    authenticadables: DS.hasMany('authenticadable', {
	async: true
    })
});
