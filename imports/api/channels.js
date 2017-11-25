import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random'

const Channels = new Mongo.Collection('channels');
const recentCommentsLimit = 10;

const Channel = Class.create({
	name: 'Channel',
	collection: Channels,
	secured: false,
	fields: {
		name: String,
		createdAt: Date,
		members: Object, // who has access and when they last viewed which drives unread count and read receipt
		recentComments: { // fixed length array for recent comments
			type: [Object],
			default: function() {
				return [];
			}
		},
	},
	meteorMethods: {
		updateLastRead(user) {

			if (user) {
				const { _id, username } = user
				this.members[_id] = {
					userId: _id,
					username,
					lastViewedAt: new Date(),
					isTyping: null,
				}
				return this.save()
			}
			else {
				return false
			}
		},

		// keeping recentComments a fixed length
		addComment(user, comment) {
			const { _id, username } = user
			// check recentComments size is over limit
			if (this.recentComments.length >= recentCommentsLimit) {
				// remove the first - oldest comment
				this.recentComments.shift()
			}

			// add new comment to the end
			this.set({
				recentComments: [
					// existing comments
					...this.recentComments,
					// new comment
					{
						_id: Random.id(17),
						userId: _id,
						username,
						comment,
						createdAt: new Date()
					},
				]
			});

			return this.save(() => {
				return this.setIsTyping(user, null);
			});
		},

		setIsTyping(user, isTyping) {
			console.log('setIsTyping');
			if (user) {
				const { _id, username } = user

				const newMembers = this.members
				newMembers[_id] = {
					...this.members[_id],
					isTyping,
				}

				this.set({
					members: newMembers
				})

				return this.save()
			}
			else {
				return false
			}
		}

	}
});

Channel.createChannel = (newChannel) => {
	const {
		user: {
			_id: userId,
			username,
		},
		name: channelName,
	} = newChannel;

	const channel = new Channel()
	channel.name = channelName;
	channel.createdAt = new Date()
	channel.members = {}
	channel.members[userId] = {
		username,
		lastViewedAt: new Date(),
	}
	return channel.save()
}

export default Channel;
