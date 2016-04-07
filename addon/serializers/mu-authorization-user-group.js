import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType)
    {
	Ember.Logger.log(payload);
	payload.data.forEach(function(d,i)
			     {
				 d.type="mu-authorization-user-group";
			     });
	return this._super(...arguments);
    },
});
