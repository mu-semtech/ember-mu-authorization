import DS from 'ember-data';

export default DS.Model.extend({
    accessTokens: DS.hasMany('muAuthorizationAccessToken', {
	async: true
    }),
    authenticadables: DS.hasMany('muAuthorizationAuthenticatable', {
	async: true
    })
});
