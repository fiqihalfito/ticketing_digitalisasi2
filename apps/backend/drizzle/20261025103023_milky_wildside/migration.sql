CREATE TYPE "priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "role_member" AS ENUM('requester', 'executioner');--> statement-breakpoint
CREATE TYPE "status" AS ENUM('open', 'in_progress', 'closed');--> statement-breakpoint
CREATE TABLE "accounts" (
	"account_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"user_id" uuid NOT NULL,
	"issuer" text,
	"provider_account_id" text,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp(6) with time zone,
	"refresh_token_expires_at" timestamp(6) with time zone,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "application_services" (
	"application_service_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"sub_department_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "departements" (
	"departement_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "help_topics" (
	"help_topic_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"application_service_id" uuid NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"organization_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"user_id" uuid NOT NULL,
	"token" varchar NOT NULL UNIQUE,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"impersonated_by" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_departments" (
	"sub_department_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"departement_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_teams" (
	"sub_team_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"team_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subfields" (
	"subfield_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_leaders" (
	"team_leader_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"user_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"team_member_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"user_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	"sub_team_id" uuid,
	"roleMember" "role_member",
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"team_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"sub_department_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ticket_assignments" (
	"ticket_assignment_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"ticket_id" uuid NOT NULL,
	"assignee_member_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ticket_chat_attachments" (
	"ticket_chat_attachment_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"ticket_chat_id" uuid NOT NULL,
	"title" text NOT NULL,
	"url_file" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ticket_chats" (
	"ticket_chat_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"ticket_id" uuid NOT NULL,
	"team_member_id" uuid NOT NULL,
	"body_chat" jsonb NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"ticket_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"requester_member_id" uuid NOT NULL,
	"help_topic_id" uuid NOT NULL,
	"status" "status" DEFAULT 'open'::"status" NOT NULL,
	"priority" "priority" DEFAULT 'medium'::"priority" NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"verification_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "accountsTable_issuer_providerAccountId_uidx" ON "accounts" ("issuer","provider_account_id");--> statement-breakpoint
CREATE INDEX "accountsTable_userId_idx" ON "accounts" ("user_id");--> statement-breakpoint
CREATE INDEX "sessionsTable_userId_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "verificationsTable_identifier_idx" ON "verifications" ("identifier");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "application_services" ADD CONSTRAINT "application_services_UCklrcvxOmvi_fkey" FOREIGN KEY ("sub_department_id") REFERENCES "sub_departments"("sub_department_id");--> statement-breakpoint
ALTER TABLE "departements" ADD CONSTRAINT "departements_organization_id_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id");--> statement-breakpoint
ALTER TABLE "departements" ADD CONSTRAINT "departements_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "help_topics" ADD CONSTRAINT "help_topics_1tnbRcHVjfiQ_fkey" FOREIGN KEY ("application_service_id") REFERENCES "application_services"("application_service_id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sub_departments" ADD CONSTRAINT "sub_departments_departement_id_departements_departement_id_fkey" FOREIGN KEY ("departement_id") REFERENCES "departements"("departement_id");--> statement-breakpoint
ALTER TABLE "sub_departments" ADD CONSTRAINT "sub_departments_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "sub_teams" ADD CONSTRAINT "sub_teams_team_id_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id");--> statement-breakpoint
ALTER TABLE "team_leaders" ADD CONSTRAINT "team_leaders_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "team_leaders" ADD CONSTRAINT "team_leaders_team_id_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id");--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id");--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_sub_team_id_sub_teams_sub_team_id_fkey" FOREIGN KEY ("sub_team_id") REFERENCES "sub_teams"("sub_team_id");--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_sub_department_id_sub_departments_sub_department_id_fkey" FOREIGN KEY ("sub_department_id") REFERENCES "sub_departments"("sub_department_id");--> statement-breakpoint
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_ticket_id_tickets_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id");--> statement-breakpoint
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_vELrAFVQAsuP_fkey" FOREIGN KEY ("assignee_member_id") REFERENCES "team_members"("team_member_id");--> statement-breakpoint
ALTER TABLE "ticket_chat_attachments" ADD CONSTRAINT "ticket_chat_attachments_kOvTmfWB8DHP_fkey" FOREIGN KEY ("ticket_chat_id") REFERENCES "ticket_chats"("ticket_chat_id");--> statement-breakpoint
ALTER TABLE "ticket_chats" ADD CONSTRAINT "ticket_chats_ticket_id_tickets_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id");--> statement-breakpoint
ALTER TABLE "ticket_chats" ADD CONSTRAINT "ticket_chats_team_member_id_team_members_team_member_id_fkey" FOREIGN KEY ("team_member_id") REFERENCES "team_members"("team_member_id");--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_requester_member_id_team_members_team_member_id_fkey" FOREIGN KEY ("requester_member_id") REFERENCES "team_members"("team_member_id");--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_help_topic_id_help_topics_help_topic_id_fkey" FOREIGN KEY ("help_topic_id") REFERENCES "help_topics"("help_topic_id");