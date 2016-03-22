import Ember from 'ember';
import layout from '../templates/components/authorizations-list';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['authorization-list'],

    authority: void 0,
    authenticadables: [],
    readAddables: [],
    writeAddables: [],
    createAddables: [],
    deleteAddables: [],
    moreReadAddablesLeft: true,
    moreDeleteAddablesLeft: true,
    moreCreateAddablesLeft: true,
    moreWriteAddablesLeft: true,
    calculateAddables: function() {
	var auths, createAddables, creates, deleteAddables, deletes;
	var readAddables, reads, writeAddables, writes;
	reads = this.get('authority.canRead');
	writes = this.get('authority.canWrite');
	creates = this.get('authority.canCreate');
	deletes = this.get('authority.canDelete');
	readAddables = [];
	writeAddables = [];
	createAddables = [];
	deleteAddables = [];
	auths = this.get('authenticadables');
	auths.forEach(function(auth, index) {
	    if (!(reads != null ? reads.contains(auth) : void 0)) {
		readAddables.pushObject(auth);
	    }
	    if (!(writes != null ? writes.contains(auth) : void 0)) {
		writeAddables.pushObject(auth);
	    }
	    if (!(creates != null ? creates.contains(auth) : void 0)) {
		createAddables.pushObject(auth);
	    }
	    if (!(deletes != null ? deletes.contains(auth) : void 0)) {
		return deleteAddables.pushObject(auth);
	    }
	});
	this.set('readAddables', readAddables);
	this.set('writeAddables', writeAddables);
	this.set('createAddables', createAddables);
	this.set('deleteAddables', deleteAddables);
	this.set('moreReadAddablesLeft', readAddables.get('length') !== 0);
	this.set('moreWriteAddablesLeft', writeAddables.get('length') !== 0);
	this.set('moreCreateAddablesLeft', createAddables.get('length') !== 0);
	return this.set('moreDeleteAddablesLeft', deleteAddables.get('length') !== 0);
    },
    willRender: function() {
	return this.calculateAddables();
    },
    __authenticadablesObserver__: Ember.observer('authority', 'authenticadables', function() {
	return this.calculateAddables();
    }),
    actions: {
	addReadAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canRead').pushObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	addWriteAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canWrite').pushObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	addCreateAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canCreate').pushObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	addDeleteAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canDelete').pushObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	removeReadAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canRead').removeObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	removeWriteAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canWrite').removeObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	removeCreateAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canCreate').removeObject(auth);
	    authority.save();
	    return this.calculateAddables();
	},
	removeDeleteAuthorization: function(auth) {
	    var authority;
	    authority = this.get('authority');
	    authority.get('canDelete').removeObject(auth);
	    authority.save();
	    return this.calculateAddables();
	}
    }
    
});
