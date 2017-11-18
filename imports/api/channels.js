import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

const Channels = new Mongo.Collection('channels');

export const Channel = Class.create({
	name: 'Channel',
	collection: Channels,
	fields: {
		name: String,
		createdAt: Date
	}
});
