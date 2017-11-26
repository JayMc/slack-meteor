# Goal
Create a very basic Slack like chat app to fulfill the below objectives using a Mongo schema.

# Primary objectives
- [x] Each user having own unread count for each channel
- [x] User roles [admin, user]
- [x] Channel member list
- [x] Message read receipt

# Secondary objectives (nice to have)
- [ ] Comment pagination
- [ ] Display unread and day separation line in comments list
- [ ] User online status
- [x] User is typing
- [x] Preview last message in channel (without being in channel)
- [ ] Invite or add users to channel

# Schema design
This Mongo schema should provide a enough support for the above features.

Channel Schema
```javascript
{
	name: String,
	createdAt: Date,
	members: { // supports user statuses, unread count, invite
		$userId: {
			username: String,
			lastViewedAt: Date, // supports unread count and read receipt
			isTyping: Date, // set a date 30 seconds in the future to expire is typing status
			roles: Array,
		},
	},
	recentComments: [ // fixed length array for recent comments - older comments are shifted off (deleted)
		// Actual comments stored in another collection.
		// Supports: unread count, read receipt, message preview, new message separation line,
		{
			_id: String,
			userId: String,
			username: String,
			comment: String,
			createdAt: Date,
		},
	],
}
```
