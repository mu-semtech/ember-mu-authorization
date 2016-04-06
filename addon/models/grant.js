import DS from 'ember-data';

export default DS.Model.extend({
    accessTokens: DS.hasMany('access-token', {
	async: true
    }),
    authenticadables: DS.hasMany('authenticadable', {
	async: true
    })
});
