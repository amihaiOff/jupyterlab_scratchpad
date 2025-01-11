import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyterlab_scratchpad extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_scratchpad:plugin',
  description: 'JupyterLab extension for a side panel with a scratchpad',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jupyterlab_scratchpad is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyterlab_scratchpad settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jupyterlab_scratchpad.', reason);
        });
    }
  }
};

export default plugin;
