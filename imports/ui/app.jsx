import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Channel } from '../api/channels.js';

class App extends Component {

	render() {
		const { channels } = this.props;
		console.log('channels',channels);
		return (
			<div className="container">

				<div>
					Channels
					<ul>
						{channels.length > 0 && channels.map(channel => (
							<li key={channel._id}>{channel.name}</li>
						))}
					</ul>
				</div>

				<div>
					Comments
					<ul>
						<li>comment 1</li>
					</ul>
				</div>

			</div>
		);
	}
}

export default createContainer(() => {
	return {
		channels: Channel.find({}).fetch(),
	};
}, App);
