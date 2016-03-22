import Ember from 'ember';
import layout from '../templates/components/user-display';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['user-display'],

    actions:
    {
	manageAuthorizations: function(user)
	{
	    return this.sendAction('manageAuthorizations', user);
	}
    }
});
