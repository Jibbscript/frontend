import { module, test } from 'qunit';
import { setupTest } from 'codecrafters-frontend/tests/helpers';

module('Unit | Controller | demo/dark-mode-toggle', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:demo/dark-mode-toggle');
    assert.ok(controller);
  });
});
