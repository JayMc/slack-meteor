import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Channel from '../api/channels.js';

export default class ChannelsList extends PureComponent {

	handleSendChannel () {
		const { currentUser } = this.props;
		Channel.createChannel({
			name: ReactDOM.findDOMNode(this.refs.channelInput).value.trim(),
			user: currentUser,
		})
		ReactDOM.findDOMNode(this.refs.channelInput).value = '';
	}

	handleCreateChannel = () => {
		return this.handleSendChannel()
	}

	render() {
		const { currentChannelId, currentUser, channels, handleChannelClick } = this.props;
		return (
			<div>
				Channels
				<ul>
					{channels.length > 0 && channels.map(channel => {

						const memberNames = Object.keys(channel.members).map(member => {
							return channel.members[member].username ? channel.members[member].username : 'unknown'
						});
						const name = channel.name
						const memberSelf = channel.members[currentUser._id] ? channel.members[currentUser._id] : null
						const unReadComments = channel.recentComments.filter(comment => {
							// unread comments are of a date more recent than the user lastViewedAt
							return memberSelf && channel._id !== currentChannelId && moment(memberSelf.lastViewedAt).isBefore(comment.createdAt);
						})

						return (
							<li key={channel._id}>
								<h3>{name}<span>{unReadComments ? ` (${unReadComments.length}!) ` : ' ' }</span></h3>
								<span>Members: {memberNames.join(', ')}</span>
								<br />
								<button onClick={handleChannelClick(channel._id)}>Select</button>
							</li>
						);
					})}
				</ul>

				<input
					type="text"
					ref="channelInput"
					placeholder="channel"
				/>
			<button onClick={this.handleCreateChannel}>Create</button>

			</div>
		)
	}
}
