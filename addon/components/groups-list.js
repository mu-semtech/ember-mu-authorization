import Ember from 'ember';
import layout from '../templates/components/groups-list';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['groups-list'],

    store: Ember.inject.service('store'),

    groups: [],

    didInsertElement: function() {
	var groupPromise;
	groupPromise = this.get('store').query('userGroup', {});
	return groupPromise.then((function(_this) {
	    return function(groupslist) {
		var ngroups;
		ngroups = [];
		groupslist.forEach(function(g, i) {
		    return ngroups.pushObject(g);
		});
		return _this.set('groups', ngroups);
	    };
	})(this));
    },

    actions: {
	openNewGroup: function() {
	    const action = this.get("openNewGroup");
	    if (action) { action() }
	},
	removeGroup: function(group) {
	    group.destroyRecord();
	},
	openGroupDetail: function(group) {
	    const action = this.get("openGroupDetail");
	    Ember.Logger.log("in groupslist: " + group);
	    if (action) { action(group); }
	}
    }
});
