import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/app.jsx';

Meteor.startup(() => {
	render(<App />, document.getElementById('render-target'));
});
