import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Channel } from '../api/channels.js';
import AccountsUIWrapper from './accounts-ui-wrapper.jsx';
import ChannelsList from './channels-list.jsx';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentChannel: null
		}
	}

	handleChangeChannel (id) {
		const { currentChannel, currentUser } = this.props;
		// set current channel
		this.setState({currentChannel: id})
		// update last read
		if (currentChannel) {
			currentChannel.updateLastRead(currentUser);
		}
	}

	handleChannelClick = (id) => {
		return () => this.handleChangeChannel(id)
	}

	render() {
		const { channels, currentUser } = this.props;
		const { currentChannel } = this.state;

		return (
			<div className="container">

				<AccountsUIWrapper />

				<ChannelsList
					channels={channels}
					handleChannelClick={this.handleChannelClick}
				/>

				{currentChannel &&
					<div>
						Comments
						<ul>
							<li>comment 1</li>
						</ul>
					</div>
				}

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
