import Ember from 'ember';
import layout from '../templates/components/groups-list';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['groups-list'],

    store: Ember.inject.service('store'),

    groups: [],

    calculateGroups: function() {
	var groupPromise;
	
	groupPromise = this.get('store').query('muAuthorizationUserGroup', { reload: true });

	groupPromise.then((function(_this) {
	    return function(groupslist) {
		var ngroups;
		ngroups = [];
		groupslist.forEach(function(g, i) {
		    return ngroups.pushObject(g);
		});
		return _this.set('groups', ngroups);
	    };
	})(this));

	return groupPromise;
    },

    didInsertElement: function() {
	return this.calculateGroups();
    },

    actions: {
	openNewGroup: function() {
	    const action = this.get("openNewGroup");
	    if (action) { action() }
	},
	removeGroup: function(group) {
	    return group.destroyRecord().then((function(_this) {
		return function() {
		    return _this.calculateGroups();
		};
	    })(this));
	},
	openGroupDetail: function(group) {
	    const action = this.get("openGroupDetail");
	    Ember.Logger.log("in groupslist: " + group);
	    if (action) { action(group); }
	}
    }
});
