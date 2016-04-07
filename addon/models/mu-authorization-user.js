import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    userGroups: DS.hasMany('muAuthorizationUserGroup', {
	async: true
    }),
    grants: DS.hasMany('muAuthorizationGrant', {
	async: true
    })
});
