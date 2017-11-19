import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Channel } from '../api/channels.js';
import AccountsUIWrapper from './accounts-ui-wrapper.jsx';

class App extends Component {

	render() {
		const { channels, currentUser } = this.props;
		console.log('channels',channels);
		console.log('currentUser',currentUser);
		return (
			<div className="container">

				<AccountsUIWrapper />

				<div>
					Channels
					<ul>
						{channels.length > 0 && channels.map(channel => (
							<li key={channel._id}>{channel.name}</li>
						))}
					</ul>
				</div>

				<div>
					Comments
					<ul>
						<li>comment 1</li>
					</ul>
				</div>

			</div>
		);
	}
}

export default createContainer(() => {
	return {
		channels: Channel.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);
