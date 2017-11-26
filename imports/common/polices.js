export const roles = {
	// From highest to lowest each role extends the permissions below it.
	OWNER: 'owner', // can add/remove admin role to members
	ADMIN: 'admin', // can add/remove members
	MEMBER: 'member', // can post messages
	GUEST: 'guest', // can read messages
};

export const roleValues = Object.keys(roles).map(r => roles[r]);

export function checkRoles (requiredRoles, roles) {
	const validRole = roles.find(r => requiredRoles.includes(r));
	if (validRole) {
		return {
			result: true,
			message: validRole,
		}
	}
	else {
		return {
			result: false,
			message: `Require: ${requiredRoles.join(', ')}`,
		}
	}
}

export function canPost (memberRoles) {

	if (!memberRoles) {
		return {
			result: false,
			message: `No Roles found`,
		}
	}

	return checkRoles([
		roles.OWNER,
		roles.ADMIN,
		roles.MEMBER,
	], memberRoles);
}
