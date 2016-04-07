import Ember from 'ember';
import layout from '../templates/components/users-list';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['users-list'],

    store: Ember.inject.service('store'),

    users: [],

    calculateUsers: function() {
	var userPromise;
	
	userPromise = this.get('store').query('muAuthorizationUser', {});
	
	userPromise.then((function(_this) {
	    return function(userList) {
		var nusers;
		nusers = [];
		userList.forEach(function(u, i) {
		    return nusers.pushObject(u);
		});
		return _this.set('users', nusers);
	    };
	})(this));

	return userPromise;
    },

    didInsertElement: function() {
	return this.calculateUsers();
    },

    actions: {
	removeUser: function(user) {
	    return user.destroyRecord().then((function(_this) {
		return function() {
		    return _this.calculateUsers();
		};
	    })(this));
	},
	openNewUser: function() {
	    const action = this.get("openNewUser");
	    if(action){ action(); }
	},
	openUserDetail: function(user) {
	    const action=this.get("openUserDetail");
	    if(action){ action(user);}
	}
    }
});
