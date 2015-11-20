import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widget-model-embedded-collection-widget', 'Integration | Component | widget model embedded collection widget', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widget-model-embedded-collection-widget}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widget-model-embedded-collection-widget}}
      template block text
    {{/widget-model-embedded-collection-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
