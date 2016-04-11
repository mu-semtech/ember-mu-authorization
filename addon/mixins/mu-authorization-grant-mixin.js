import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
    accessTokens: DS.hasMany('access-token', {
	async: true
    }),
    authenticatables: DS.hasMany('authenticatable', {
	async: true
    })
});
