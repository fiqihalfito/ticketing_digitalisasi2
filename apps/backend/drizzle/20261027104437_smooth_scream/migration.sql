-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "org_role_member" AS ENUM('requester', 'executioner');--> statement-breakpoint
CREATE TYPE "ticket_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "ticket_status" AS ENUM('open', 'in_progress', 'closed');--> statement-breakpoint
CREATE TABLE "auth_accounts" (
	"auth_account_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"auth_user_id" uuid NOT NULL,
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
CREATE TABLE "auth_sessions" (
	"auth_session_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"auth_user_id" uuid NOT NULL,
	"token" varchar NOT NULL CONSTRAINT "auth_sessions_token_key" UNIQUE,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"impersonated_by" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_users" (
	"auth_user_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"email" varchar NOT NULL CONSTRAINT "auth_users_email_key" UNIQUE,
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
CREATE TABLE "auth_verifications" (
	"auth_verification_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp(6) with time zone NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catalog_application_services" (
	"catalog_application_service_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"org_sub_department_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catalog_help_topics" (
	"catalog_help_topic_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"catalog_application_service_id" uuid NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_departements" (
	"org_departement_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"org_organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"auth_user_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_organizations" (
	"org_organization_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_sub_departments" (
	"org_sub_department_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"org_departement_id" uuid NOT NULL,
	"auth_user_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_sub_teams" (
	"org_sub_team_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"org_team_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_team_leaders" (
	"org_team_leader_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"auth_user_id" uuid NOT NULL,
	"org_team_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_team_members" (
	"org_team_member_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"auth_user_id" uuid NOT NULL,
	"org_team_id" uuid NOT NULL,
	"org_sub_team_id" uuid,
	"roleMember" "org_role_member",
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_teams" (
	"org_team_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"org_sub_department_id" uuid NOT NULL,
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
	"org_team_member_id" uuid NOT NULL,
	"body_chat" jsonb NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"ticket_id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"org_team_member_id" uuid NOT NULL,
	"catalog_help_topic_id" uuid NOT NULL,
	"status" "ticket_status" DEFAULT 'open'::"ticket_status" NOT NULL,
	"priority" "ticket_priority" DEFAULT 'medium'::"ticket_priority" NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "authAccountsTable_authUserId_idx" ON "auth_accounts" ("auth_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "authAccountsTable_issuer_providerAccountId_uidx" ON "auth_accounts" ("issuer","provider_account_id");--> statement-breakpoint
CREATE INDEX "authSessionsTable_authUserId_idx" ON "auth_sessions" ("auth_user_id");--> statement-breakpoint
CREATE INDEX "authVerificationsTable_identifier_idx" ON "auth_verifications" ("identifier");--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_auth_user_id_auth_users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth_users"("auth_user_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_auth_user_id_auth_users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth_users"("auth_user_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "catalog_application_services" ADD CONSTRAINT "catalog_application_services_PqLuwJxOgjMD_fkey" FOREIGN KEY ("org_sub_department_id") REFERENCES "org_sub_departments"("org_sub_department_id");--> statement-breakpoint
ALTER TABLE "catalog_help_topics" ADD CONSTRAINT "catalog_help_topics_XZAy83POOs5K_fkey" FOREIGN KEY ("catalog_application_service_id") REFERENCES "catalog_application_services"("catalog_application_service_id");--> statement-breakpoint
ALTER TABLE "org_departements" ADD CONSTRAINT "org_departements_auth_user_id_auth_users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth_users"("auth_user_id");--> statement-breakpoint
ALTER TABLE "org_departements" ADD CONSTRAINT "org_departements_RRM1CzvzrQmp_fkey" FOREIGN KEY ("org_organization_id") REFERENCES "org_organizations"("org_organization_id");--> statement-breakpoint
ALTER TABLE "org_sub_departments" ADD CONSTRAINT "org_sub_departments_auth_user_id_auth_users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth_users"("auth_user_id");--> statement-breakpoint
ALTER TABLE "org_sub_departments" ADD CONSTRAINT "org_sub_departments_i3hBfLJbIQVP_fkey" FOREIGN KEY ("org_departement_id") REFERENCES "org_departements"("org_departement_id");--> statement-breakpoint
ALTER TABLE "org_sub_teams" ADD CONSTRAINT "org_sub_teams_org_team_id_org_teams_org_team_id_fkey" FOREIGN KEY ("org_team_id") REFERENCES "org_teams"("org_team_id");--> statement-breakpoint
ALTER TABLE "org_team_leaders" ADD CONSTRAINT "org_team_leaders_auth_user_id_auth_users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth_users"("auth_user_id");--> statement-breakpoint
ALTER TABLE "org_team_leaders" ADD CONSTRAINT "org_team_leaders_org_team_id_org_teams_org_team_id_fkey" FOREIGN KEY ("org_team_id") REFERENCES "org_teams"("org_team_id");--> statement-breakpoint
ALTER TABLE "org_team_members" ADD CONSTRAINT "org_team_members_auth_user_id_auth_users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth_users"("auth_user_id");--> statement-breakpoint
ALTER TABLE "org_team_members" ADD CONSTRAINT "org_team_members_NAWZK6MUdax1_fkey" FOREIGN KEY ("org_sub_team_id") REFERENCES "org_sub_teams"("org_sub_team_id");--> statement-breakpoint
ALTER TABLE "org_team_members" ADD CONSTRAINT "org_team_members_org_team_id_org_teams_org_team_id_fkey" FOREIGN KEY ("org_team_id") REFERENCES "org_teams"("org_team_id");--> statement-breakpoint
ALTER TABLE "org_teams" ADD CONSTRAINT "org_teams_aaAgQsFcISyz_fkey" FOREIGN KEY ("org_sub_department_id") REFERENCES "org_sub_departments"("org_sub_department_id");--> statement-breakpoint
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_lECbDc4n0w6B_fkey" FOREIGN KEY ("assignee_member_id") REFERENCES "org_team_members"("org_team_member_id");--> statement-breakpoint
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_ticket_id_tickets_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id");--> statement-breakpoint
ALTER TABLE "ticket_chat_attachments" ADD CONSTRAINT "ticket_chat_attachments_kOvTmfWB8DHP_fkey" FOREIGN KEY ("ticket_chat_id") REFERENCES "ticket_chats"("ticket_chat_id");--> statement-breakpoint
ALTER TABLE "ticket_chats" ADD CONSTRAINT "ticket_chats_hlxF7VTT4q0H_fkey" FOREIGN KEY ("org_team_member_id") REFERENCES "org_team_members"("org_team_member_id");--> statement-breakpoint
ALTER TABLE "ticket_chats" ADD CONSTRAINT "ticket_chats_ticket_id_tickets_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id");--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_xM6KSApB8pGg_fkey" FOREIGN KEY ("catalog_help_topic_id") REFERENCES "catalog_help_topics"("catalog_help_topic_id");--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_zuUt3srZKjYM_fkey" FOREIGN KEY ("org_team_member_id") REFERENCES "org_team_members"("org_team_member_id");
*/