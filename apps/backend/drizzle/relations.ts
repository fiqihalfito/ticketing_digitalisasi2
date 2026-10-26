import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	accounts: {
		user: r.one.users({
			from: r.accounts.userId,
			to: r.users.userId
		}),
	},
	users: {
		accounts: r.many.accounts(),
		organizations: r.many.organizations(),
		sessions: r.many.sessions(),
		departements: r.many.departements(),
		teams: r.many.teams(),
		teamMembers: r.many.teamMembers(),
	},
	applicationServices: {
		subDepartment: r.one.subDepartments({
			from: r.applicationServices.subDepartmentId,
			to: r.subDepartments.subDepartmentId
		}),
		helpTopics: r.many.helpTopics(),
	},
	subDepartments: {
		applicationServices: r.many.applicationServices(),
		teams: r.many.teams(),
	},
	organizations: {
		users: r.many.users({
			from: r.organizations.organizationId.through(r.departements.organizationId),
			to: r.users.userId.through(r.departements.userId)
		}),
	},
	helpTopics: {
		applicationService: r.one.applicationServices({
			from: r.helpTopics.applicationServiceId,
			to: r.applicationServices.applicationServiceId
		}),
		teamMembers: r.many.teamMembers({
			from: r.helpTopics.helpTopicId.through(r.tickets.helpTopicId),
			to: r.teamMembers.teamMemberId.through(r.tickets.requesterMemberId)
		}),
	},
	sessions: {
		user: r.one.users({
			from: r.sessions.userId,
			to: r.users.userId
		}),
	},
	departements: {
		users: r.many.users({
			from: r.departements.departementId.through(r.subDepartments.departementId),
			to: r.users.userId.through(r.subDepartments.userId)
		}),
	},
	subTeams: {
		team: r.one.teams({
			from: r.subTeams.teamId,
			to: r.teams.teamId
		}),
		teamMembers: r.many.teamMembers(),
	},
	teams: {
		subTeams: r.many.subTeams(),
		users: r.many.users({
			from: r.teams.teamId.through(r.teamLeaders.teamId),
			to: r.users.userId.through(r.teamLeaders.userId)
		}),
		teamMembers: r.many.teamMembers(),
		subDepartment: r.one.subDepartments({
			from: r.teams.subDepartmentId,
			to: r.subDepartments.subDepartmentId
		}),
	},
	teamMembers: {
		subTeam: r.one.subTeams({
			from: r.teamMembers.subTeamId,
			to: r.subTeams.subTeamId
		}),
		team: r.one.teams({
			from: r.teamMembers.teamId,
			to: r.teams.teamId
		}),
		user: r.one.users({
			from: r.teamMembers.userId,
			to: r.users.userId
		}),
		ticketsViaTicketAssignments: r.many.tickets({
			alias: "tickets_ticketId_teamMembers_teamMemberId_via_ticketAssignments"
		}),
		ticketsViaTicketChats: r.many.tickets({
			from: r.teamMembers.teamMemberId.through(r.ticketChats.teamMemberId),
			to: r.tickets.ticketId.through(r.ticketChats.ticketId),
			alias: "teamMembers_teamMemberId_tickets_ticketId_via_ticketChats"
		}),
		helpTopics: r.many.helpTopics(),
	},
	tickets: {
		teamMembersViaTicketAssignments: r.many.teamMembers({
			from: r.tickets.ticketId.through(r.ticketAssignments.ticketId),
			to: r.teamMembers.teamMemberId.through(r.ticketAssignments.assigneeMemberId),
			alias: "tickets_ticketId_teamMembers_teamMemberId_via_ticketAssignments"
		}),
		teamMembersViaTicketChats: r.many.teamMembers({
			alias: "teamMembers_teamMemberId_tickets_ticketId_via_ticketChats"
		}),
	},
	ticketChatAttachments: {
		ticketChat: r.one.ticketChats({
			from: r.ticketChatAttachments.ticketChatId,
			to: r.ticketChats.ticketChatId
		}),
	},
	ticketChats: {
		ticketChatAttachments: r.many.ticketChatAttachments(),
	},
}))