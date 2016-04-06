import Ember from 'ember';
import layout from '../templates/components/user-display';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['user-display'],

    hasNoGroups: Ember.computed('user',
				function()
				{
				    return((this.get('user.userGroups.length')) === 0);
				}),

    actions:
    {
	manageAuthorizationsUser: function(user)
	{
	    Ember.Logger.log("in USER DISPLAY");
	    const action = this.get("manageAuthorizationsUser");
	    if(action){ action(user); }
	}
    }
});
