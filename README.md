# Eureka-widget-model-embedded-collection-widget

An Eureka widget to embed another eureka collection widget. Usage:

Example for `blog-post/views/model/index.js`

    export default {
        widgets: [
            {
                type: 'model-embedded-collection-widget',

                // the resource to apply the widget
                resource: 'Comment',

                // the collection query
                // "${_id}" is the id of the model (from the route)
                query: {"blogPost._id": "${_id}"},

                // query option
                queryOptions: {
                    limit: 10
                },

                // the widget which will display the collection
                widget: {
                    type: 'collection-display'
                   label: "related comments"
                }
            }
        ]
    }

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
