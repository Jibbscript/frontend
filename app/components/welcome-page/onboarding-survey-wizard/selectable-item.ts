import Component from '@glimmer/component';
import { toRight, toLeft } from 'ember-animated/transitions/move-over';

type Signature = {
  Element: HTMLButtonElement;

  Args: {
    isSelected: boolean;
  };

  Blocks: {
    default: [];
  };
};

export default class SelectableItemComponent extends Component<Signature> {
  toRight = toRight;
  toLeft = toLeft;

  rules({ newItems }: { newItems: unknown[] }) {
    if (newItems[0]) {
      return toRight;
    } else {
      return toLeft;
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'WelcomePage::OnboardingSurveyWizard::SelectableItem': typeof SelectableItemComponent;
  }
}
