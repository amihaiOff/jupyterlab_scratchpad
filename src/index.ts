import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { Widget          } from '@lumino/widgets';


class SideBarHelloWidget extends Widget {
  constructor(app: JupyterFrontEnd, commandId: string) {
    super();
    this.id = 'sidebar-hello';
    this.title.label = 'Yo';
    this.title.closable = true;
    this.addClass('sbhw');
    let body = document.createElement('body');

    let button_info: Record<string,string> = {
      'E' : 'Hello World!',
      'F' : 'Bonjour le Monde!',
      'G' : 'Hàlo a Shaoghail!',
      'H' : '!שלום עולם',
    } 
    for (const key in button_info) {
      let b = document.createElement('button')
      b.innerText = key;
      b.addEventListener('click', () => {
        app.commands.execute(commandId, {greeting:button_info[key]});
      });
      body.appendChild(b);
    }
    this.node.appendChild(body);
  }
}

function _activate(app:     JupyterFrontEnd) {
    console.log('JupyterLab extension pydjlx is activated!');
    let commandId = 'pydjlx:Hello';
    let sbwidget = new SideBarHelloWidget(app, commandId);
    app.shell.add(sbwidget, 'right');
    app.shell.activateById(sbwidget.id)
}


/**
 * Initialization data for the jupyterlab_scratchpad extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_scratchpad:plugin',
  description: 'JupyterLab extension for a side panel with a scratchpad',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: _activate
  // activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
  //   console.log('JupyterLab extension jupyterlab_scratchpad is activated!');

  //   if (settingRegistry) {
  //     settingRegistry
  //       .load(plugin.id)
  //       .then(settings => {
  //         console.log('jupyterlab_scratchpad settings loaded:', settings.composite);
  //       })
  //       .catch(reason => {
  //         console.error('Failed to load settings for jupyterlab_scratchpad.', reason);
  //       });
  //   }
  // }
};

export default plugin;
