import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

/*
registerServiceWorker is created by React's official scaffolding tool create-react-app, the registerServiceWorker.js file will exist in the directory. What is the purpose of this file?

This file can be used or not. Use it to turn your react project into a PWA (Progressive Web Application). That is, just visit your website once, the next time even if there is no network, this application can still be accessed. 

Of course, its benefits are not only a little bit. When you open the project on the mobile side, if you use a high-level browser such as chrome or firefox, the browser will give your a different display page. Your web page will look like more like a native app, the experience is actually better.

In the public directory of the project, there is a manifest.json file. You can configure some of your web pages here. When a user visits a web page and generates a desktop shortcut for a web page, the content in the file is used as an icon. The display content of the text.

Configuring manifest.jsos and then use registerServiceWorker.js, users can put your web page shortcuts on the desktop, because your web page supports offline access at this time, so it is very close to the experience of the native app.
*/
registerServiceWorker();
