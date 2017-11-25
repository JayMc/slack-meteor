import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

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

	componentDidMount() {
		// for clearing isTyping after it has expired
		setInterval(() => {
			this.forceUpdate();
		}, 5000);
	}

	render() {
		const { channels, currentUser } = this.props;
		const { currentChannelId } = this.state;

		// check if any members (other than self) are typing
		// returns an object each key as channel id and value is array of members who are typing
		let usersTyping = [];
		if (currentUser) {
			usersTyping = channels.reduce((acc, channel) => {
				acc[channel._id] = [];

				Object.keys(channel.members).map(m => {
					const member = channel.members[m];
					// if isTyping expires in the futgiture add the member to the list
					if (member.userId !== currentUser._id && moment(member.isTyping).isAfter()) {
						acc[channel._id].push(member.username);
					}
				})

				return acc;
			}, {});
		}

		return (
			<div className="container">

				<AccountsUIWrapper />

				<div className="chat-container">
					{!!currentUser && !!channels &&
						<ChannelsList
							currentChannelId={currentChannelId}
							currentUser={currentUser}
							channels={channels}
							handleChannelClick={this.handleChannelClick}
							usersTyping={usersTyping}
							/>
					}

					{currentChannelId && channels &&
						<CommentsList
							currentChannelId={currentChannelId}
							usersTyping={usersTyping[currentChannelId]}
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
