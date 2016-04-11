import Ember from 'ember';
import layout from '../templates/components/authorizations-list';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['authorization-list'],

    store: Ember.inject.service('store'),

    authority: void 0,

    accessTokens: [],

    grantCollections: {},

    addableGrantCollections: {},

    authenticatables: [],

    allGrants: [],

    init: function()
    {
	this._super(...arguments);
    },

    didInsertElement: function()
    {
	var authPromise, grantPromise, tokenPromise;
	authPromise = this.calculateAuthenticatables();
	authPromise.then((function(_this) {
	    return function(result) {
		return _this.recalculate();
	    };
	})(this));
	tokenPromise = this.calculateAccessTokens();
	tokenPromise.then((function(_this) {
	    return function(result) {
		return _this.recalculate();
	    };
	})(this));
	grantPromise = this.calculateAllGrants();
	grantPromise.then((function(_this) {
	    return function(result) {
		result.forEach(function(grant, index) {
		    var authsPromise, tokensPromise;
		    authsPromise = grant.get('authenticatables');
		    authsPromise.then(function(res) {
			return _this.recalculate();
		    });
		    tokensPromise = grant.get('accessTokens');
		    return tokensPromise.then(function(res) {
			return _this.recalculate();
		    });
		});
		return _this.recalculate();
	    };
	})(this));
	return this.recalculate();
    },

    recalculate: function()
    {
	this.calculateGrantCollections();
    },
    
    calculateAuthenticatables: function()
    {
    	var authPromise;
    	authPromise = this.get('store').findAll('authenticatable');
    	return authPromise.then((function(_this) {
    	    return function(auths) {
    		var authenticatables;
    		authenticatables = [];
    		auths.forEach(function(auth, index) {
    		    return authenticatables.pushObject(auth);
    		});
    		return _this.set('authenticatables', authenticatables);
    	    };
    	})(this));
    },

    calculateAllGrants: function() {
	var grantPromise;
	grantPromise = this.get('store').findAll('grant');
	return grantPromise.then((function(_this) {
	    return function(items) {
		var grants;
		grants = [];
		items.forEach(function(it, ind) {
		    return grants.pushObject(it);
		});
		return _this.set('allGrants', grants);
	    };
	})(this));
    },

    calculateAccessTokens: function() {
	var atPromise;
	atPromise = this.get('store').findAll('access-token');
	return atPromise.then((function(_this) {
	    return function(ats) {
		var accessTokens;
		accessTokens = [];
		ats.forEach(function(at, index) {
		    return accessTokens.pushObject(at);
		});
		return _this.set('accessTokens', accessTokens);
	    };
	})(this));
    },

    hasAccessTokenForAuthenticatable: function(tokenId, authenticatableId)
    {
	var hasAccessToken = false;
	
	this.get('authority.grants').forEach(
	    function(grant, index)
	    {
		var linksToAuthority = false, linksToAuthenticatable = false;
		var fa = grant.get('accessTokens').filter(function(t){
		    if(t.get('id')===tokenId)
		    {
			return true;
		    }
		    return false;
		});
		var fo = grant.get('authenticatables').filter(function(a){
		    if(a.get('id')===authenticatableId)
		    {
			return true;
		    }
		    return false;
		});
		if((fa.length > 0) && (fo.length > 0))
		{
		    hasAccessToken = true;
		}
	    });
	
	return hasAccessToken;
    },

    calculateGrantCollections: function()
    {	
	var accessTokens, grantCollections;
	accessTokens = void 0;
	grantCollections = void 0;
	accessTokens = this.get('accessTokens');
	grantCollections = [];
	accessTokens.forEach((function(_this) {
	    return function(accessToken, index) {
		var addables, authenticatables, authority, members;
		authenticatables = _this.get('authenticatables');
		authority = _this.get('authority');
		addables = void 0;
		members = void 0;
		members = [];
		addables = [];

		authenticatables.forEach(function(auth, i) {
		    var isMember;
		    isMember = void 0;
		    isMember = void 0;
		    isMember = false;
		    if(_this.hasAccessTokenForAuthenticatable(accessToken.get('id'),
							      auth.get('id')))
		    {
			isMember = true;
		    }

		    if (isMember) {
			return members.pushObject(auth);
		    } else {
			return addables.pushObject(auth);
		    }
		});
		
		grantCollections.pushObject({
		    token: accessToken,
		    members: members,
		    addables: addables,
		    addablesLeft: addables.length > 0
		});
	    };
	})(this));
	this.set('addableGrantCollections', grantCollections);
    },

    addGrantToAuthority: function(grant)
    {
	this.get('authority.grants').pushObject(grant);
	this.get('authority').save();
    },

    getGrantFor: function(authenticatable, token) {
    },

    addGrantFor: function(authenticatable, token) {
	var grant;
	var grants;
	grants = this.get('allGrants');
	grants.forEach((function(_this) {
	    return function(grant, index) {
		if (grant.get('accessTokens').contains(token) && grant.get('authenticatables').contains(authenticatable)) {
		    _this.addGrantToAuthority(grant);
		}
		else
		{
		    if(index >= (grants.length - 1))
		    {
			grant = _this.get('store').createRecord('grant',{
			});
			grant.get('accessTokens').pushObject(token);
			grant.get('authenticatables').pushObject(authenticatable);
			
			grant.save().then((function(_this) {
			    return function(gr) {
				return _this.addGrantToAuthority(gr);
			    };
			})(_this));
		    }
		}
	    };
	})(this));
    },

    removeGrant: function(authenticatable, token){
	var grants;
	grants = this.get('allGrants');
	grants.forEach((function(_this) {
	    return function(grant, index) {
		if (grant.get('accessTokens').contains(token) && grant.get('authenticatables').contains(authenticatable)) {

 		    var savePromise;

		    var authority = _this.get('authority');

		    var grantslist = Ember.get(authority, 'grants');

		    grantslist.removeObject(grant);

		    savePromise = authority.save();
		    
		    savePromise.then((function(_this) {
			return function(result) {
			    return _this.recalculate();
			};
		    })(_this));
			    
		}
	    };
	})(this));
    },
    
    __authenticatablesObserver__: Ember.observer('authority', 'authority.grants', 'authenticatables', 'accessTokens', 'grants', 'allGrants', 'allGrants.accessTokens', 'allGrants.authenticatables', function() {
	return this.recalculate();
    }),
    actions: {
	addGrant: function(auth, token) {
	    this.addGrantFor(auth, token);
	},
	removeGrant: function(auth, token) {
	    this.removeGrant(auth, token);
	},
    }
    
});
