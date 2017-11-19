import React, { PureComponent } from 'react';

export default class ChannelsList extends PureComponent {

	render() {
		const { channels, handleChannelClick } = this.props;
		return (
			<div>
				Channels
				<ul>
					{channels.length > 0 && channels.map(channel => {
						const members = Object.keys(channel.members).map(member => {
							return channel.members[member].username ? channel.members[member].username : 'unknown'
						});
						const name = channel.name

						return (
							<li key={channel._id}>
								{name} ({members.join(', ')})
								<button onClick={handleChannelClick(channel._id)}>Select</button>
							</li>
						);
					})}
				</ul>
			</div>
		)
	}
}
