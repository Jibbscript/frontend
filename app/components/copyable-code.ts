import Component from '@glimmer/component';
import window from 'ember-window-mock';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

interface Signature {
  Element: HTMLElement;

  Args: {
    code: string;
    onCopyButtonClick?: () => void;
  };
}

export default class CopyableCodeComponent extends Component<Signature> {
  @tracked codeWasCopiedRecently: boolean = false;

  @action
  handleCopyButtonClick() {
    window.navigator.clipboard.writeText(this.args.code);

    this.codeWasCopiedRecently = true;

    later(
      this,
      () => {
        this.codeWasCopiedRecently = false;
      },
      1000,
    );

    if (this.args.onCopyButtonClick) {
      this.args.onCopyButtonClick();
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CopyableCode: typeof CopyableCodeComponent;
  }
}
