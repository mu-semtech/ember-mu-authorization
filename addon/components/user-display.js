import Ember from 'ember';
import layout from '../templates/components/user-display';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['user-display'],

    actions:
    {
	manageAuthorizationsUser: function(user)
	{
	    //return this.sendAction('manageAuthorizations', user);
	    Ember.Logger.log("in USER DISPLAY");
	    const action = this.get("manageAuthorizationsUser");
	    if(action){ action(user); }
	}
    }
});
