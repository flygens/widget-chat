import { render } from 'solid-js/web';

import { FlygensAgent } from './init';
import { FlygensWidget } from './widget';
import css from './widget.css?inline';

export const showFlygensWidget = (containerId = 'flygens-widget-root') => {
  if (!FlygensAgent.instance.isInitialized) {
    console.error(
      'It was expected that PUBLIC KEY would exist to represent the FlygensWidget',
    );
    return;
  }

  let widgetRoot = document.getElementById(containerId);
  if (!widgetRoot) {
    widgetRoot = document.createElement('div');
    widgetRoot.id = containerId;
    document.body.appendChild(widgetRoot);
  }

  const shadow = widgetRoot.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = css;
  shadow.appendChild(style);
  render(() => <FlygensWidget />, shadow);
};
