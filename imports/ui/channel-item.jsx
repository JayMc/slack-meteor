import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Channel from '../api/channels.js';
import IsTyping from './is-typing.jsx'

export default class ChannelItem extends PureComponent {

	render() {
		const { channel, currentChannelId, unReadComments, memberNames, usersTyping, handleChannelClick } = this.props;

		const selectedStyle = channel._id === currentChannelId ? {
			background: 'darkviolet',
		} : {}
		return (
			<div onClick={handleChannelClick(channel._id)} >
				<div
					className="channel-title"
					style={selectedStyle}
				>
					{channel.name}
					{unReadComments.length > 0 &&
						<div className="unreadBadge">{unReadComments.length}</div>
					}
					{!!usersTyping.length &&
							<IsTyping
								usersTyping={usersTyping}
							/>
					}
				</div>

				<span className="channel-members-list">Members: {memberNames.join(', ')}</span>
				<br />
				<br />
			</div>
		)
	}
}
