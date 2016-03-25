import Ember from 'ember';
import layout from '../templates/components/new-user';

export default Ember.Component.extend({
  layout: layout,

    classNames: ['new-user'],

    store: Ember.inject.service('store'),

    name: void 0,

    actions:
    {
	createUser: function()
	{
	    var group, name;
	    
	    name = this.get('name');
	    
	    group = this.get('store').createRecord('user', {
		name: name
	    });
	    
	    group.save();
	    
	    this.set('name', "");

	    this.sendAction('moveToScreen', "1");
	}
    }
});
