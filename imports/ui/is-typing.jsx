import React, { PureComponent } from 'react';

export default class IsTyping extends PureComponent {

	render () {
		const { usersTyping, inSideChannel } = this.props;

		// Show is typing in side a channel
		if (inSideChannel) {
			return (
				<div>
					{!!usersTyping && usersTyping.length === 1 &&
						<p>{`${usersTyping[0]} is typing`}</p>
					}
					{!!usersTyping && usersTyping.length === 2 &&
						<p>{`${usersTyping[1]} and ${usersTyping[1]} are typing`}</p>
					}
					{!!usersTyping && usersTyping.length > 2 &&
						<p>a few people are typing</p>
					}
				</div>
			)
		}

		// show is typing in the channel list
		return (
			<div
				style={{
					display: 'table',
					height: '100%',
				}}
			>
				<div
					style={{
						display: 'table-cell',
						verticalAlign: 'middle',
						padding: '10px',
					}}
				>
					<div className="typing-indicator">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				{usersTyping[usersTyping.length-1]}
			</div>
		)
	}
}
