import { clickOnText, create, visitable } from 'ember-cli-page-object';

export default create({
  clickOnLink: clickOnText(),
  visit: visitable('/admin/courses'),
});
