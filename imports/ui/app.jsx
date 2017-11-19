import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Channel } from '../api/channels.js';
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
		channel.updateLastRead(currentUser);
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
		);
	}
}

export default createContainer(() => {

	return {
		channels: Channel.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);
