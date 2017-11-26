import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import Channel from '../api/channels.js';
import IsTyping from './is-typing.jsx';
import ReadReceipt from './read-receipt.jsx';

class CommentsList extends Component {

	handleIsTyping () {
		const { channel, currentUser } = this.props;
		const comment = ReactDOM.findDOMNode(this.refs.commentInput).value.trim();
		channel.setIsTyping(currentUser, comment ? moment().add(30, 'seconds').format() : null)
	}

	handleSendComment () {
		const { channel, currentUser } = this.props;
		import { Channel } from '../api/channels.js';
		const comment = ReactDOM.findDOMNode(this.refs.commentInput).value.trim();
		if (comment) {
			channel.callMethod('addComment', currentUser, comment, (err, result) => {
				if (result) {
					ReactDOM.findDOMNode(this.refs.commentInput).value = '';
				}
			})
		}
	}

	handleComposeComment = () => {
		return this.handleSendComment()
	}

	render() {
		const { currentChannelId, channel, usersTyping, currentUser } = this.props;
		const comments = channel.recentComments;
		const memberSelf = channel.members[currentUser._id] ? channel.members[currentUser._id] : null

		return (
			<div className="comments-list">
				<div>
					{comments.length > 0 && comments.map((comment, i) => {
						// get message that is last and owner by currentUser
						const readReceiptMessage = (i === comments.length - 1 && comments[i].userId === currentUser._id) ? comments[i] : null;
						const readReceipt = [];
						if (readReceiptMessage) {
							// if the last message was owned by currentUser check it other members have a lastViewedAt after this message created date
							readReceipt = Object.keys(channel.members).filter(m => {
								const member = channel.members[m]
								return member.userId !== currentUser._id && moment(member.lastViewedAt).isAfter(readReceiptMessage.createdAt);
							});
						}
						const memberCount = Object.keys(channel.members).length;
						return (
							<div
								key={comment._id}
								className="comment-container"
							>
								<div
									className="comment-author"
								>
									<span>
										{comment.username}
									</span>
									<span className="comment-time-ago">
										{moment(comment.createdAt).fromNow()}
									</span>
								</div>
								<div
									className="comment-body"
									style={{
										color: moment(memberSelf.lastViewedAt).isBefore(comment.createdAt) ? 'navy' : 'black',
									}}
									onClick={() => channel.updateLastRead(currentUser)}
								>
									{comment.comment}
								</div>

								<ReadReceipt
									readReceipt={readReceipt}
									readReceiptMessage={readReceiptMessage}
									memberCount={memberCount}
								/>
							</div>
						);
					})}
				</div>

				<input
					type="text"
					ref="commentInput"
					placeholder="comment"
					onClick={() => channel.updateLastRead(currentUser)}
					onKeyUp ={() => this.handleIsTyping()}
				/>
				<IsTyping
					usersTyping={usersTyping}
					inSideChannel={true}
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
