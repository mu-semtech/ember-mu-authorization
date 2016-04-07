import Ember from 'ember';
import layout from '../templates/components/new-group';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['new-group'],

    store: Ember.inject.service('store'),

    name: void 0,

    actions:
    {
	createGroup: function()
	{
	    var group, name;
	    
	    name = this.get('name');
	    
	    group = this.get('store').createRecord('muAuthorizationUserGroup', {
		name: name
	    });
	    
	    group.save();
	    
	    this.set('name', "");

	    this.sendAction('moveToScreen', "0");
	}
    }
});
