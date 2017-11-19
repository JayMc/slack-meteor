import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

const Channels = new Mongo.Collection('channels');

export const Channel = Class.create({
	name: 'Channel',
	collection: Channels,
	fields: {
		name: String,
		createdAt: Date,
		members: Object, // who has access and when they last viewed which drives unread count and read receipt
	},
	meteorMethods: {
		updateLastRead(user) {

			if (user) {
				const { _id, username } = user
				this.members[_id] = {
					username,
					lastViewedAt: new Date,
				}
				return this.save()
			}
			else {
				return false
			}
		},

	}
});
