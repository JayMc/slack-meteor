import moment from 'moment';

// check if any members (other than self) are typing
// returns an object each key as channel id and value is array of members who are typing
export function membersTypingByChannel (currentUser, channels) {
	const usersTyping = channels.reduce((acc, channel) => {
		acc[channel._id] = [];

		Object.keys(channel.members).map(m => {
			const member = channel.members[m];
			// if isTyping expires in the future add the member to the list
			if (member.userId !== currentUser._id && moment(member.isTyping).isAfter()) {
				acc[channel._id].push(member.username);
			}
		})

		return acc;
	}, {});

	return usersTyping;
}
