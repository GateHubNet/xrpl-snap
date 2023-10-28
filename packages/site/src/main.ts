// eslint-disable-next-line import/no-unassigned-import, import/extensions
import './theme/styles.scss';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
