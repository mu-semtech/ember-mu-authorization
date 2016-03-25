import Ember from 'ember';
import layout from '../templates/components/authorization-manager';

export default Ember.Component.extend({
    layout: layout,

    classNames: ['authorization-manager'],

    activeScreen: "0",

    currentModel: void 0,

    isScreen0Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="0");
    }),

    isScreen1Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="1");
    }),

    isScreen2Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="2");
    }),

    isScreen3Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="3");
    }),

    isScreen4Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="4");
    }),

    isScreen5Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="5");
    }),

    isScreen6Active: Ember.computed('activeScreen', function(){
	return (this.get('activeScreen')==="6");
    }),


    actions:
    {
	moveToScreen: function(screen)
	{
	    this.set('activeScreen', screen);
	},

	openGroupDetail: function(group)
	{
	    this.set('currentModel', group);
	    this.set('activeScreen', "2");
	},

	openUserDetail: function(group)
	{
	    this.set('currentModel', group);
	    this.set('activeScreen', "3");
	},

	manageAuthorizationsGroup: function(group)
	{
	    this.set('currentModel', group);
	    Ember.Logger.log("in AUTHORIZATION MANAER");
	    this.set('activeScreen', "4");
	},

	manageAuthorizationsUser: function(user)
	{
	    this.set('currentModel', user);
	    Ember.Logger.log("in AUTHORIZATION MANAER");
	    this.set('activeScreen', "5");
	},

	openNewGroup: function ()
	{
	    this.set('activeScreen', "6");
	},

	openNewUser: function()
	{
	    this.set('activeScreen', "7");
	}

    }
	
});
