import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	authAccounts: {
		authUser: r.one.authUsers({
			from: r.authAccounts.authUserId,
			to: r.authUsers.authUserId
		}),
	},
	authUsers: {
		authAccounts: r.many.authAccounts(),
		authSessions: r.many.authSessions(),
		orgOrganizations: r.many.orgOrganizations({
			from: r.authUsers.authUserId.through(r.orgDepartements.authUserId),
			to: r.orgOrganizations.orgOrganizationId.through(r.orgDepartements.orgOrganizationId)
		}),
		orgDepartements: r.many.orgDepartements({
			from: r.authUsers.authUserId.through(r.orgSubDepartments.authUserId),
			to: r.orgDepartements.orgDepartementId.through(r.orgSubDepartments.orgDepartementId)
		}),
		orgTeams: r.many.orgTeams({
			from: r.authUsers.authUserId.through(r.orgTeamLeaders.authUserId),
			to: r.orgTeams.orgTeamId.through(r.orgTeamLeaders.orgTeamId)
		}),
		orgTeamMembers: r.many.orgTeamMembers(),
	},
	authSessions: {
		authUser: r.one.authUsers({
			from: r.authSessions.authUserId,
			to: r.authUsers.authUserId
		}),
	},
	catalogApplicationServices: {
		orgSubDepartment: r.one.orgSubDepartments({
			from: r.catalogApplicationServices.orgSubDepartmentId,
			to: r.orgSubDepartments.orgSubDepartmentId
		}),
		catalogHelpTopics: r.many.catalogHelpTopics(),
	},
	orgSubDepartments: {
		catalogApplicationServices: r.many.catalogApplicationServices(),
		orgTeams: r.many.orgTeams(),
	},
	catalogHelpTopics: {
		catalogApplicationService: r.one.catalogApplicationServices({
			from: r.catalogHelpTopics.catalogApplicationServiceId,
			to: r.catalogApplicationServices.catalogApplicationServiceId
		}),
		orgTeamMembers: r.many.orgTeamMembers({
			from: r.catalogHelpTopics.catalogHelpTopicId.through(r.tickets.catalogHelpTopicId),
			to: r.orgTeamMembers.orgTeamMemberId.through(r.tickets.orgTeamMemberId)
		}),
	},
	orgOrganizations: {
		authUsers: r.many.authUsers(),
	},
	orgDepartements: {
		authUsers: r.many.authUsers(),
	},
	orgSubTeams: {
		orgTeam: r.one.orgTeams({
			from: r.orgSubTeams.orgTeamId,
			to: r.orgTeams.orgTeamId
		}),
		orgTeamMembers: r.many.orgTeamMembers(),
	},
	orgTeams: {
		orgSubTeams: r.many.orgSubTeams(),
		authUsers: r.many.authUsers(),
		orgTeamMembers: r.many.orgTeamMembers(),
		orgSubDepartment: r.one.orgSubDepartments({
			from: r.orgTeams.orgSubDepartmentId,
			to: r.orgSubDepartments.orgSubDepartmentId
		}),
	},
	orgTeamMembers: {
		authUser: r.one.authUsers({
			from: r.orgTeamMembers.authUserId,
			to: r.authUsers.authUserId
		}),
		orgSubTeam: r.one.orgSubTeams({
			from: r.orgTeamMembers.orgSubTeamId,
			to: r.orgSubTeams.orgSubTeamId
		}),
		orgTeam: r.one.orgTeams({
			from: r.orgTeamMembers.orgTeamId,
			to: r.orgTeams.orgTeamId
		}),
		ticketsViaTicketAssignments: r.many.tickets({
			from: r.orgTeamMembers.orgTeamMemberId.through(r.ticketAssignments.assigneeMemberId),
			to: r.tickets.ticketId.through(r.ticketAssignments.ticketId),
			alias: "orgTeamMembers_orgTeamMemberId_tickets_ticketId_via_ticketAssignments"
		}),
		ticketsViaTicketChats: r.many.tickets({
			from: r.orgTeamMembers.orgTeamMemberId.through(r.ticketChats.orgTeamMemberId),
			to: r.tickets.ticketId.through(r.ticketChats.ticketId),
			alias: "orgTeamMembers_orgTeamMemberId_tickets_ticketId_via_ticketChats"
		}),
		catalogHelpTopics: r.many.catalogHelpTopics(),
	},
	tickets: {
		orgTeamMembersViaTicketAssignments: r.many.orgTeamMembers({
			alias: "orgTeamMembers_orgTeamMemberId_tickets_ticketId_via_ticketAssignments"
		}),
		orgTeamMembersViaTicketChats: r.many.orgTeamMembers({
			alias: "orgTeamMembers_orgTeamMemberId_tickets_ticketId_via_ticketChats"
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