import Ember from 'ember';
import layout from '../templates/components/collapsible-division';

export default Ember.Component.extend({
    layout: layout,

    expanded: false,

    header: "",

    headerStyle: Ember.computed('expanded', function()
				{
				    if(this.get('expanded')===true)
				    {
					return "collapsible-division-header-expanded";
				    }
				    else
				    {
					return "collapsible-division-header";
				    }
				}),

    actions:
    {
	toggleExpanded: function()
	{
	    if(this.get('expanded')===true)
	    {
		this.set('expanded', false);
	    }
	    else
	    {
		this.set('expanded', true);
	    }
	}
    }
});
