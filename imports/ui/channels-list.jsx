import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Channel from '../api/channels.js';
import ChannelItem from './channel-item.jsx';

export default class ChannelsList extends PureComponent {

	handleSendChannel () {
		const { currentUser } = this.props;
		const newChannelName = ReactDOM.findDOMNode(this.refs.channelInput).value.trim()
		if (newChannelName) {
			Channel.createChannel({
				name: newChannelName,
				user: currentUser,
			})
			ReactDOM.findDOMNode(this.refs.channelInput).value = '';
		}
	}

	handleCreateChannel = () => {
		return this.handleSendChannel()
	}

	render() {
		const { currentChannelId, currentUser, channels, allUsersTyping, handleChannelClick } = this.props;

		return (
			<div className="channels-list">
				<div>
					{!!channels && channels.length === 0 &&
						<p>No channels</p>
					}
					{!!channels && channels.length > 0 && channels.map(channel => {
						// get member names
						const memberNames = Object.keys(channel.members).map(member => {
							return channel.members[member].username ? channel.members[member].username : 'unknown'
						});

						// get currentUser unread count
						const memberSelf = channel.members[currentUser._id] ? channel.members[currentUser._id] : null
						const unReadComments = channel.recentComments.filter(comment => {
							// unread comments are of a date more recent than the user lastViewedAt
							return memberSelf && channel._id !== currentChannelId && moment(memberSelf.lastViewedAt).isBefore(comment.createdAt);
						})

						const usersTyping = allUsersTyping[channel._id] ? allUsersTyping[channel._id] : [];

						return (
							<ChannelItem
								key={channel._id}
								currentChannelId={currentChannelId}
								channel={channel}
								unReadComments={unReadComments}
								memberNames={memberNames}
								usersTyping={usersTyping}
								handleChannelClick={handleChannelClick}
							/>
						);
					})}
				</div>
				<br />

				<input
					type="text"
					ref="channelInput"
					placeholder="new channel"
				/>
			<button onClick={this.handleCreateChannel}>Create</button>

			</div>
		)
	}
}
