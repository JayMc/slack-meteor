import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Channel from '../api/channels.js';
import IsTyping from './is-typing.jsx'

export default class ChannelItem extends PureComponent {

	render() {
		const { channel, unReadComments, memberNames, usersTyping, handleChannelClick } = this.props;
		return (
			<div>
				<div className="channel-title" style={{ fontWeight: '400' }}>
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
				<button onClick={handleChannelClick(channel._id)}>Select</button>
				<br />
			</div>
		)
	}
}
