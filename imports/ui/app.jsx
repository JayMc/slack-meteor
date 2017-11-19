import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Channel } from '../api/channels.js';
import AccountsUIWrapper from './accounts-ui-wrapper.jsx';

class App extends Component {

	componentDidMount () {
		setTimeout(() => {
			const { currentChannel, currentUser } = this.props;
			if (currentChannel) {
				currentChannel.updateLastRead(currentUser);
			}
		}, 1000);
	}

	render() {
		const { channels, currentUser } = this.props;

		return (
			<div className="container">

				<AccountsUIWrapper />

				<div>
					Channels
					<ul>
						{channels.length > 0 && channels.map(channel => {
							const members = Object.keys(channel.members).map(member => {
								return channel.members[member].username ? channel.members[member].username : 'unknown'
							});
							const name = channel.name

							return (
								<li key={channel._id}>{name} ({members.join(', ')})</li>
							);
						})}
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
		currentChannel: Channel.findOne({}),
		currentUser: Meteor.user(),
	};
}, App);
