import Ember from 'ember';
import ModelWidget from 'ember-eureka/widget-model';
import CollectionQuery from 'ember-eureka/collection-query';
import layout from '../templates/components/widget-model-embedded-collection-widget';

export default ModelWidget.extend({
    layout: layout,

    model: Ember.computed.alias('routeModel'),
    db: Ember.computed.alias('store.db'),

    resource: Ember.computed.alias('config.resource'),

    queryTemplate: Ember.computed.alias('config.query'),

    /** build the query from the template and its options
     *  passed in the widget's configuration (queryTemplate)
     */
    query: Ember.computed('queryTemplate', 'model._id', 'queryOptions', function() {
        let queryTemplate = this.get('queryTemplate');

        if (!queryTemplate) {
            return {};
        }

        queryTemplate = JSON.stringify(queryTemplate);

        let re = /\$\{([^}]*)\}/g;
        let model = this.get('model');
        let query = queryTemplate;
        let match = re.exec(queryTemplate);
        let placeholder, fieldName;

        while (match !== null) {
            placeholder = match[0];
            fieldName = match[1];
            query = query.replace(placeholder, model.get(fieldName));
            match = re.exec(queryTemplate);
        }

        try {
            query = JSON.parse(query);
        } catch(e) {
            throw new Error(`cannot parse query. Reason: ${e}`, query);
        }

        // update the query with options
        Ember.setProperties(query, this.get('queryOptions'));

        return query;
    }),

    queryOptions: Ember.computed('config.queryOptions', function() {
        let queryOptions = this.getWithDefault('config.queryOptions', {});
        let results = {};
        if (queryOptions) {
            Object.keys(queryOptions).forEach(function(option) {
                results['_'+option] = queryOptions[option];
            });
        }
        return results;
    }),

    collectionRouteModel: Ember.computed('resource', 'db', 'query', function() {
        let classifiedResource = Ember.String.classify(this.get('resource'));
        let relationModelMeta = this.get(`db.${classifiedResource}.modelMeta`);
        let query = CollectionQuery.create();
        query.set('raw', this.get('query'));
        return Ember.Object.create({
            meta: relationModelMeta,
            query: query
        });
    })
});
