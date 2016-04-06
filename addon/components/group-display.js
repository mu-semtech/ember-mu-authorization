import Ember from 'ember';
import layout from '../templates/components/group-display';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['group-display'],

    store: Ember.inject.service('store'),

    // the group this component is displating
    group: void 0,

    // USERS SECTION
    // the list of all users in the system
    users:[],
    
    // the list of users that can be added to this group
    addableUsers:[],
    
    // addableUsers.length == 0
    noMoreAddableUsers: true,
    
    // GROUPS SECTION
    // the list of all groups in the system
    groups: [],
    
    // the list of groups that can be assigned as subgroup for this group
    addableSubGroups: [],
    
    // addableSubGroups.length ==0
    noMoreAddableSubGroups: true,

    // fire it up upon initialization
    init: function()
    {
	this._super(...arguments);
	this.initialCalculations();
        this.calculateAddableUsers();
	this.calculateAddableGroups();
    },
    
    // do it again after inserting, just to be sure...
    didInsertElement: function()
    {
	this.initialCalculations();
        this.calculateAddableUsers();
	this.calculateAddableGroups();
    },
        
    // this will fill the users variable with all users
    // on the system and the groups variable with all
    // groups on the system
    initialCalculations: function() {
	var groupsPromise, userPromise;
	userPromise = this.get('store').findAll('user');
	userPromise.then((function(_this) {
	    return function(users) {
		var nusers;
		nusers = [];
		users.forEach(function(user, index) {
		    return nusers.pushObject(user);
		});
		_this.set('users', nusers);
		_this.calculateAddableUsers();
	    };
	})(this));
	userPromise;
	groupsPromise = this.get('store').findAll('userGroup', {
	    reload: true
	});
	return groupsPromise.then((function(_this) {
	    return function(groups) {
		var ngroups;
		ngroups = [];
		groups.forEach(function(group, index) {
		    return ngroups.pushObject(group);
		});
		_this.set('groups', ngroups);
		_this.calculateAddableGroups();
	    };
	})(this));
    },
    
    willRender: function()
    {
	this.calculateAddableUsers();
	this.calculateAddableGroups();
	this.set('noReadAuthorizations', this.get('group.canRead.length') === 0);
	this.set('noDeleteAuthorizations', this.get('group.canDelete.length') === 0);
	this.set('noCreateAuthorizations', this.get('group.canCreate.length') === 0);
	return this.set('noWriteAuthorizations', this.get('group.canWrite.length') === 0);
    },
    calculateAddableUsers: function()
    {
	var aUsers, addedUsers, group, users;
	aUsers = [];
	users = this.get('users');
	group = this.get('group');
	addedUsers = group.get('users');
	users.forEach(function(user, index)
	{
	    if (!addedUsers.contains(user))
	    {
		return aUsers.pushObject(user);
	    }
	});
	this.set('addableUsers', aUsers);
	return this.set('noMoreAddableUsers', aUsers.length === 0);
    },
    
    __groupsObserver__: Ember.observer('groups', function() {
	return this.calculateAddableGroups();
    }),
    
    calculateAddableGroups: function()
    {
    var aGroups, groups, ref, unaddableGroups;
    aGroups = [];
    groups = this.get('groups');
    unaddableGroups = this._composeParentGroupList(this.get('group'));
    if ((ref = this.get('group.subGroups')) != null) {
      ref.forEach(function(sg, sgi) {
        if (!unaddableGroups.contains(sg)) {
          return unaddableGroups.pushObject(sg);
        }
      });
    }
    if (groups != null) {
      groups.forEach(function(g, i) {
        if (!unaddableGroups.contains(g)) {
          return aGroups.addObject(g);
        }
      });
    }
    this.set('addableSubGroups', aGroups);
    return this.set('noMoreAddableSubGroups', aGroups.length === 0);
  },
  _composeParentGroupList: function(group) {
    var pgl, ref;
    pgl = [];
    if (group != null) {
      if ((ref = group.get('parentGroups')) != null) {
        ref.forEach((function(_this) {
          return function(pg, index) {
            var opgl;
            opgl = _this._composeParentGroupList(pg);
            return opgl.forEach(function(pgli, pglindex) {
              if (!pgl.contains(pgli)) {
                return pgl.addObject(pgli);
              }
            });
          };
        })(this));
      }
    }
    return pgl.addObject(group);
  },
  actions: {
    // toggleUserPanel: function() {
    //   this.calculateAddableUsers();
    //   if (!this.get('active') === true) {
    //     return this.set('active', true);
    //   } else {
    //     return this.set('active', false);
    //   }
    // },
    removeUser: function(user) {
      var group, users;
      Ember.Logger.log('removing user ' + user);
      group = this.get('group');
      users = group.get('users');
      users.removeObject(user);
      group.save();
      return this.calculateAddableUsers();
    },
    addUser: function(user) {
      var group, users;
      group = this.get('group');
      users = group.get('users');
      users.addObject(user);
      group.save();
      return this.calculateAddableUsers();
    },
    addSubGroup: function(subGroup) {
      var group;
      group = this.get('group');
      group.get('subGroups').pushObject(subGroup);
      group.save();
      return this.calculateAddableGroups();
    },
    removeSubGroup: function(subGroup) {
      var group;
      group = this.get('group');
      group.get('subGroups').removeObject(subGroup);
      group.save();
      return this.calculateAddableSubGroups();
    },
    manageAuthorizationsGroup: function(group) {
	//return this.sendAction('groupManageAuthorizations');
	Ember.Logger.log("in GROUP DISPLAY");
	const action = this.get("manageAuthorizationsGroup");
	if(action){ action(group); }
    }
  }
});
