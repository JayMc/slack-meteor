import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Channel from '../api/channels.js';
import AccountsUIWrapper from './accounts-ui-wrapper.jsx';
import ChannelsList from './channels-list.jsx';
import CommentsList from './comments-list.jsx';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentChannelId: null
		}
	}

	handleChangeChannel (id) {
		const { channels, currentUser } = this.props;
		// set current channel
		this.setState({currentChannelId: id})
		// update last read
		const channel = channels.find(channel => channel._id === id)

		// delay so the user has time to see what is new when they enter the channel
		setTimeout(() => {
			channel.updateLastRead(currentUser);
		}, 3000)
	}

	handleChannelClick = (id) => {
		return () => this.handleChangeChannel(id)
	}

	render() {
		const { channels, currentUser } = this.props;
		const { currentChannelId } = this.state;

		return (
			<div className="container">

				<AccountsUIWrapper />

				<div className="chat-container">
					{currentUser && channels &&
						<ChannelsList
							currentChannelId={currentChannelId}
							currentUser={currentUser}
							channels={channels}
							handleChannelClick={this.handleChannelClick}
							/>
					}

					{currentChannelId && channels &&
						<CommentsList
							currentChannelId={currentChannelId}
							/>
					}
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
