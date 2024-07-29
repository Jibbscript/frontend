import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type DarkModeService from 'codecrafters-frontend/services/dark-mode';
import type { LocalStoragePreference } from 'codecrafters-frontend/services/dark-mode';

export interface Signature {
  Element: Element;

  Args: {
    size?: 'regular' | 'small';
  };
}

export default class DarkModeToggleComponent extends Component<Signature> {
  @service declare darkMode: DarkModeService;

  possiblePreferences: LocalStoragePreference[] = ['system', 'light', 'dark'];

  @action
  setPreference(newValue: LocalStoragePreference) {
    this.darkMode.updateLocalStoragePreference(newValue);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    DarkModeToggle: typeof DarkModeToggleComponent;
  }
}
