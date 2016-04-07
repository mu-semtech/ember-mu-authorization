import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    users: DS.hasMany('muAuthorizationUser', {
	async: true
    }),
    grants: DS.hasMany('muAuthorizationGrant', {
	async: true
    }),
    subGroups: DS.hasMany('muAuthorizationUserGroup', {
	async: true,
	inverse: 'parentGroups'
    }),
    parentGroups: DS.hasMany('muAuthorizationUserGroup', {
	async: true,
	inverse: 'subGroups'
    })  
});
