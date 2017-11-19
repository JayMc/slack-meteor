import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import Channel from '../api/channels.js';

class CommentsList extends Component {

	handleSendComment () {
		const { channel, currentUser } = this.props;
		import { Channel } from '../api/channels.js';
		const comment = ReactDOM.findDOMNode(this.refs.commentInput).value.trim();
		ReactDOM.findDOMNode(this.refs.commentInput).value = '';
		channel.addComment(currentUser, comment)
	}

	handleComposeComment = () => {
		return this.handleSendComment()
	}

	render() {
		const { currentChannelId, channel, currentUser } = this.props;
		const comments = channel.recentComments;
		const memberSelf = channel.members[currentUser._id] ? channel.members[currentUser._id] : null

		return (
			<div>
				<ul>
					{comments.length > 0 && comments.map(comment => {

						return (
							<li key={comment._id}>
								<span
									style={{
										color: moment(memberSelf.lastViewedAt).isBefore(comment.createdAt) ? 'green' : 'black'
									}}
									onClick={() => channel.updateLastRead(currentUser)}
								>
									{comment.comment} {comment.username}
								</span>
							</li>
						);
					})}
				</ul>

				<input
					type="text"
					ref="commentInput"
					placeholder="comment"
					onClick={() => channel.updateLastRead(currentUser)}
				/>
				<button onClick={this.handleComposeComment}>Send</button>

			</div>
		)
	}
}

export default createContainer((props) => {

	return {
		channel: Channel.findOne({_id: props.currentChannelId}),
		currentUser: Meteor.user(),
	};
}, CommentsList);
