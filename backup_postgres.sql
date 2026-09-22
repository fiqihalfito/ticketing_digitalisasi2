--
-- PostgreSQL database cluster dump
--

\restrict HN1ENljecO1Czaq9G1BIRmnrDqsVcg2HOHfxCt5sxiw5b8pbURBkMTBCWxHKsnK

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE fiqih;
ALTER ROLE fiqih WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:ih4hGOygETdCBfQInQz82w==$L50Au6OZBxpw/LiI7dyu1Fg4lsgDQDMILzgyYLC9W/c=:MyN0e4jjTAbb3uY0QIqv8H7aPjH/O46JH5Lbla6idRg=';

--
-- User Configurations
--








\unrestrict HN1ENljecO1Czaq9G1BIRmnrDqsVcg2HOHfxCt5sxiw5b8pbURBkMTBCWxHKsnK

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict 1k01GaR3pSFm0EqBcYxoC79q7hyUt522hhgivubZ7Ri1snhAi32pN5UbRnNeRxd

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict 1k01GaR3pSFm0EqBcYxoC79q7hyUt522hhgivubZ7Ri1snhAi32pN5UbRnNeRxd

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict fapANg4YzIfkXSsa1Acgcks3AOPQbLf2sJ0fJma2bBsKtb30C8aR9Z2SWVeDghV

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict fapANg4YzIfkXSsa1Acgcks3AOPQbLf2sJ0fJma2bBsKtb30C8aR9Z2SWVeDghV

--
-- Database "ticketing_digitalisasi2" dump
--

--
-- PostgreSQL database dump
--

\restrict o3tzwOuBKtMFCSQ6EICPvbaLyp9UcWGm1hOzPqjtA2ohwlgazaTPhwOPiEbiETT

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ticketing_digitalisasi2; Type: DATABASE; Schema: -; Owner: fiqih
--

CREATE DATABASE ticketing_digitalisasi2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE ticketing_digitalisasi2 OWNER TO fiqih;

\unrestrict o3tzwOuBKtMFCSQ6EICPvbaLyp9UcWGm1hOzPqjtA2ohwlgazaTPhwOPiEbiETT
\connect ticketing_digitalisasi2
\restrict o3tzwOuBKtMFCSQ6EICPvbaLyp9UcWGm1hOzPqjtA2ohwlgazaTPhwOPiEbiETT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: priority; Type: TYPE; Schema: public; Owner: fiqih
--

CREATE TYPE public.priority AS ENUM (
    'low',
    'medium',
    'high'
);


ALTER TYPE public.priority OWNER TO fiqih;

--
-- Name: role_member; Type: TYPE; Schema: public; Owner: fiqih
--

CREATE TYPE public.role_member AS ENUM (
    'requester',
    'executioner'
);


ALTER TYPE public.role_member OWNER TO fiqih;

--
-- Name: status; Type: TYPE; Schema: public; Owner: fiqih
--

CREATE TYPE public.status AS ENUM (
    'open',
    'in_progress',
    'closed'
);


ALTER TYPE public.status OWNER TO fiqih;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.accounts (
    account_id uuid DEFAULT uuidv7() NOT NULL,
    user_id uuid NOT NULL,
    issuer text,
    provider_account_id text,
    provider_id text NOT NULL,
    access_token text,
    refresh_token text,
    access_token_expires_at timestamp(6) with time zone,
    refresh_token_expires_at timestamp(6) with time zone,
    scope text,
    id_token text,
    password text,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.accounts OWNER TO fiqih;

--
-- Name: application_services; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.application_services (
    application_service_id uuid DEFAULT uuidv7() NOT NULL,
    sub_department_id uuid NOT NULL,
    name text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.application_services OWNER TO fiqih;

--
-- Name: departements; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.departements (
    departement_id uuid DEFAULT uuidv7() NOT NULL,
    organization_id uuid NOT NULL,
    name text NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.departements OWNER TO fiqih;

--
-- Name: help_topics; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.help_topics (
    help_topic_id uuid DEFAULT uuidv7() NOT NULL,
    application_service_id uuid NOT NULL,
    title text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.help_topics OWNER TO fiqih;

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.organizations (
    organization_id uuid DEFAULT uuidv7() NOT NULL,
    name text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.organizations OWNER TO fiqih;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.sessions (
    session_id uuid DEFAULT uuidv7() NOT NULL,
    user_id uuid NOT NULL,
    token character varying NOT NULL,
    expires_at timestamp(6) with time zone NOT NULL,
    ip_address text,
    user_agent text,
    impersonated_by text,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO fiqih;

--
-- Name: sub_departments; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.sub_departments (
    sub_department_id uuid DEFAULT uuidv7() NOT NULL,
    name text NOT NULL,
    departement_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sub_departments OWNER TO fiqih;

--
-- Name: sub_teams; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.sub_teams (
    sub_team_id uuid DEFAULT uuidv7() NOT NULL,
    team_id uuid NOT NULL,
    name text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sub_teams OWNER TO fiqih;

--
-- Name: subfields; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.subfields (
    subfield_id uuid DEFAULT uuidv7() NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.subfields OWNER TO fiqih;

--
-- Name: team_leaders; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.team_leaders (
    team_leader_id uuid DEFAULT uuidv7() NOT NULL,
    user_id uuid NOT NULL,
    team_id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.team_leaders OWNER TO fiqih;

--
-- Name: team_members; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.team_members (
    team_member_id uuid DEFAULT uuidv7() NOT NULL,
    user_id uuid NOT NULL,
    team_id uuid NOT NULL,
    sub_team_id uuid,
    "roleMember" public.role_member,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.team_members OWNER TO fiqih;

--
-- Name: teams; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.teams (
    team_id uuid DEFAULT uuidv7() NOT NULL,
    sub_department_id uuid NOT NULL,
    name text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.teams OWNER TO fiqih;

--
-- Name: ticket_assignments; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.ticket_assignments (
    ticket_assignment_id uuid DEFAULT uuidv7() NOT NULL,
    ticket_id uuid NOT NULL,
    assignee_member_id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.ticket_assignments OWNER TO fiqih;

--
-- Name: ticket_chat_attachments; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.ticket_chat_attachments (
    ticket_chat_attachment_id uuid DEFAULT uuidv7() NOT NULL,
    ticket_chat_id uuid NOT NULL,
    title text NOT NULL,
    url_file text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.ticket_chat_attachments OWNER TO fiqih;

--
-- Name: ticket_chats; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.ticket_chats (
    ticket_chat_id uuid DEFAULT uuidv7() NOT NULL,
    ticket_id uuid NOT NULL,
    team_member_id uuid NOT NULL,
    body_chat jsonb NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.ticket_chats OWNER TO fiqih;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.tickets (
    ticket_id uuid DEFAULT uuidv7() NOT NULL,
    requester_member_id uuid NOT NULL,
    help_topic_id uuid NOT NULL,
    status public.status DEFAULT 'open'::public.status NOT NULL,
    priority public.priority DEFAULT 'medium'::public.priority NOT NULL,
    title text NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets OWNER TO fiqih;

--
-- Name: users; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.users (
    user_id uuid DEFAULT uuidv7() NOT NULL,
    name text NOT NULL,
    email character varying NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    image text,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    role text,
    banned boolean DEFAULT false,
    ban_reason text,
    ban_expires timestamp(6) with time zone
);


ALTER TABLE public.users OWNER TO fiqih;

--
-- Name: verifications; Type: TABLE; Schema: public; Owner: fiqih
--

CREATE TABLE public.verifications (
    verification_id uuid DEFAULT uuidv7() NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp(6) with time zone NOT NULL,
    created_at timestamp(6) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.verifications OWNER TO fiqih;

--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.accounts (account_id, user_id, issuer, provider_account_id, provider_id, access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, scope, id_token, password, created_at, updated_at) FROM stdin;
01a08d95-136c-7895-90a0-b303af86c998	01a08d95-136a-73a1-9085-786c189873ab	\N	01a08d95-136a-73a1-9085-786c189873ab	credential	\N	\N	\N	\N	\N	\N	e2364a96638125681ba2fbd2b709865f:f6b881ff3a2a08c2e323219339afc85568a6aab857a2dee3199eae2583e3d2545a337990dafc17dd96e16c46782a08e71eb0df6b2553325ee8d416647935c397	2026-09-11 06:09:12.427+07	2026-09-11 06:09:12.427+07
01a08d95-13b2-7191-a50f-15ec6a9cdc7c	01a08d95-13b0-762c-a824-584906ef8548	\N	01a08d95-13b0-762c-a824-584906ef8548	credential	\N	\N	\N	\N	\N	\N	a7ab2047730d02f5a8c6f46d4dbb24a1:66008ca1133411c36e7042385de9fe7a37bd32d430e385e36c966d99eb13262f8d4498070a2ef8f01c0fe8b3b2ea9f0b71587dd3636b68691c5167eedc7644f6	2026-09-11 06:09:12.497+07	2026-09-11 06:09:12.497+07
01a08d95-13e7-7ba5-acc7-b4ba55a5fd2a	01a08d95-13e6-79d9-8e07-194fa0f4d19a	\N	01a08d95-13e6-79d9-8e07-194fa0f4d19a	credential	\N	\N	\N	\N	\N	\N	cde59ec9d258bd4ea5259c77361ae31d:9a6675e644474ea9b9a577b05d4a2e6017bfc2424a753cb26bb83df202738d696977512e500d1f4ab759707498550235598d56ee205a20b4199255c919623688	2026-09-11 06:09:12.551+07	2026-09-11 06:09:12.551+07
01a08d95-141e-784d-8df0-74c52fa6112d	01a08d95-141c-7bff-86b6-22ef2d14972a	\N	01a08d95-141c-7bff-86b6-22ef2d14972a	credential	\N	\N	\N	\N	\N	\N	0351b5446b13ba8c007b02f30ca9d1ed:f5aa4b700e9de35804f38045e322272021f4eeb44cb219b31cd17652670ff0d910fc36464c4cd3f2de2737f6fbbaa6d7972bd6ae9a2f80ffa560a97825e72d42	2026-09-11 06:09:12.606+07	2026-09-11 06:09:12.606+07
01a08d95-1454-70e1-a7d6-2bdfe73cd069	01a08d95-1452-7b0e-827c-62500229a3f1	\N	01a08d95-1452-7b0e-827c-62500229a3f1	credential	\N	\N	\N	\N	\N	\N	c40bbbe3d1f793529db45a086ca79881:c58770c102414bfe2887edb9594d3a926b11cfdcbb9653bf23d08381cf122fdeb798db5ca864515f9ccc82e3244bf4eb362960a0eec3d3e812f37ccc9a3b93f9	2026-09-11 06:09:12.659+07	2026-09-11 06:09:12.659+07
01a08d95-1489-7e22-9f3d-a8d63dca563a	01a08d95-1488-75bc-938e-9d343f1816fe	\N	01a08d95-1488-75bc-938e-9d343f1816fe	credential	\N	\N	\N	\N	\N	\N	da1d61e387b3ef697047042fb3f89ba1:81713342cb3e5c0aefd01b71288ceda5acba93e6d5c123e0703474ac0d3417aeb93caabb7579ef949470f8090a6e4889ae32e89e57aa3a4e35d5c2d13a050e62	2026-09-11 06:09:12.713+07	2026-09-11 06:09:12.713+07
01a08d95-14bf-70b1-92d7-d65641c8c520	01a08d95-14bd-7363-add4-0d5bb590a383	\N	01a08d95-14bd-7363-add4-0d5bb590a383	credential	\N	\N	\N	\N	\N	\N	ed8bd3037306ca9be75c4d77167eaa01:87339e3c4006f778f8d6eb4b63ac8090fce3d22b6b628bd0d68131847371576e27ab73a35669e29b7617285c5c28e99169897a1f16664b6d71bce3f8c65bdf7f	2026-09-11 06:09:12.766+07	2026-09-11 06:09:12.766+07
01a08d95-14f4-7853-8f77-8833c466d9aa	01a08d95-14f2-7cfb-93e0-4943ee3849a9	\N	01a08d95-14f2-7cfb-93e0-4943ee3849a9	credential	\N	\N	\N	\N	\N	\N	70922209c37605367fed284cd02f0b90:750b02fa85f50b2012131533ebf4bfcfa57f43c58f9144d7479e81783bb9a90bb641086577445f7a25f3defe0430a5d324f71e7c7545997718da16e07b8909e9	2026-09-11 06:09:12.82+07	2026-09-11 06:09:12.82+07
01a08d95-1529-7f99-a7c1-e0295f9a2e19	01a08d95-1528-7bdb-8d2f-0058cf681424	\N	01a08d95-1528-7bdb-8d2f-0058cf681424	credential	\N	\N	\N	\N	\N	\N	91dbc28182aedd43ffc68c77dee2f3cf:711798f424c2829cac26dece2a9f8756dafe28b56ab2fbdbb914d2229dd60da47aa58838ef06bfcd6c0b14caa83839e1365da81d5ae896e9fe154ea6208bb84b	2026-09-11 06:09:12.873+07	2026-09-11 06:09:12.873+07
01a08d95-155e-7e8f-8048-d0fb8c878711	01a08d95-155d-7b06-a8cc-55c89c5cca0c	\N	01a08d95-155d-7b06-a8cc-55c89c5cca0c	credential	\N	\N	\N	\N	\N	\N	524b44fb64318c6872924a0c2be9d243:940f97f2870cf9beee9683f33cfe69eb92abce71528b1ec7d0c2b214219ffb4db846d08e56a2e42b14a05f1eabe7475c6b186e32d9ccd6fa9c6ed42d4bc197f0	2026-09-11 06:09:12.926+07	2026-09-11 06:09:12.926+07
01a08d95-15a1-7732-9539-c5a41942d035	01a08d95-15a0-75ab-9cb8-fcc9be1d721f	\N	01a08d95-15a0-75ab-9cb8-fcc9be1d721f	credential	\N	\N	\N	\N	\N	\N	1966e35631742d7f79ad3beee754f733:ac78e7c7c707f4fdf054f76d594e7faa7b0b053fed3bca78b6a4c4e51e6c8296f8286158255100a14ad77e3c0e7ef7512a72648ba64439937e8da5b350366425	2026-09-11 06:09:12.993+07	2026-09-11 06:09:12.993+07
01a08d95-15d8-7dc3-9925-1a1ba6875472	01a08d95-15d7-7c2c-a013-116b7d67a0a3	\N	01a08d95-15d7-7c2c-a013-116b7d67a0a3	credential	\N	\N	\N	\N	\N	\N	88b0a3f4da7e7e0aa5379a68cabfd525:9691b87ac42d1426bb2591b0b1c892d3157a5f7cceed1cc6337ab613c121585e7446be5af23810e5b0a1eea22da3dfb2bc6ccb77abf1b83ecd9945d38c154224	2026-09-11 06:09:13.048+07	2026-09-11 06:09:13.048+07
01a08d95-160e-70bd-9347-ab3d4d8f51b9	01a08d95-160c-73f0-afa3-41432b23a126	\N	01a08d95-160c-73f0-afa3-41432b23a126	credential	\N	\N	\N	\N	\N	\N	b7cc609fd79e2e8f2c153d5ae0d9e587:8637ddee9d9d45fec197f3c0d3788e6122bb59a84c17051ad38b5e00076bdbdee541e5ade97e6c3bdce96b8f803f4aa3698b75ec951e6af862c860eabf65e36f	2026-09-11 06:09:13.101+07	2026-09-11 06:09:13.101+07
01a08d95-1642-77c4-abac-1522fc8d84c8	01a08d95-1641-7407-a5de-eeeac8ab6d42	\N	01a08d95-1641-7407-a5de-eeeac8ab6d42	credential	\N	\N	\N	\N	\N	\N	b924f0f66178b5a959c4bacfed332c86:35b5c5cf9c01c6b097e4fff5ad01b51d68db0280734a5b0776f6d325b514778f06a9092d6286461f40a1eb4ce519fd25a064c8c9c9233dce8116b65f50fb7b5a	2026-09-11 06:09:13.154+07	2026-09-11 06:09:13.154+07
01a08d95-1677-71f6-bfa8-1cdf84c9d29d	01a08d95-1675-78a1-900e-278ef0d89815	\N	01a08d95-1675-78a1-900e-278ef0d89815	credential	\N	\N	\N	\N	\N	\N	b07285ccbb294fc5db2cad12b6d7ba4c:4439268dd5eb0eef3b1e5413fd5daa6f0fca025e2a10fb4939b177938c61853c071ac51043d244460d770830e528eec318afb97e89e092ae0c06ac1e31b645c8	2026-09-11 06:09:13.206+07	2026-09-11 06:09:13.206+07
01a08d95-16b5-7250-8db3-b5d05958f8ae	01a08d95-16b3-7d4c-9fa3-0f7ae1a8bb2e	\N	01a08d95-16b3-7d4c-9fa3-0f7ae1a8bb2e	credential	\N	\N	\N	\N	\N	\N	25fb21a9b2a421f589a99d47df59e52e:79e956850cd667bd4e001928d1f93fe363b3f37d8ed99cf5234aa784625a62b44ca7aa66ee378417675a94be0503b92fea1152e50f6f3ea09d19c43bc05ce8d1	2026-09-11 06:09:13.268+07	2026-09-11 06:09:13.268+07
01a08d95-16e9-7981-a8e0-4673b23d14ad	01a08d95-16e8-7493-a027-462e149249b7	\N	01a08d95-16e8-7493-a027-462e149249b7	credential	\N	\N	\N	\N	\N	\N	5276e2c78ee7052403c148bc5bbc2dda:fe24654a17be43c8a26e142a3e23dedcaedf7821ee7fb26f154863a7770b7f04de41a65a0038e890df4308697a21ca2ce70c334c5ad3736f5dbd28a447564c8f	2026-09-11 06:09:13.321+07	2026-09-11 06:09:13.321+07
01a08d95-171e-72f8-8a2a-d9498bfebee8	01a08d95-171c-7e16-8175-6adc43499338	\N	01a08d95-171c-7e16-8175-6adc43499338	credential	\N	\N	\N	\N	\N	\N	3d1ac768f05b1c877b4a8c5fa5cb45b4:637c5512e52ed658817a9ef65d841f6472a4406cef1d03694976798fb6666807fbc3123fde9095c9671ea11fa78e23542e63b9cf89608d88293064872408060b	2026-09-11 06:09:13.373+07	2026-09-11 06:09:13.373+07
01a08d95-175c-73e2-ae98-a203bacb4e1d	01a08d95-175a-7e9b-869e-c900a83d9af8	\N	01a08d95-175a-7e9b-869e-c900a83d9af8	credential	\N	\N	\N	\N	\N	\N	19a9bfb46da7115e0b27ecd92a2b4e15:33730db2fac8824b39110e792a943bd48470181405d2d998dfbfe80a8210da02ecbcf3b118d429b2aedd270c8d182e2d1491bf03e2433aa39b8d591188cfcc91	2026-09-11 06:09:13.436+07	2026-09-11 06:09:13.436+07
01a08d95-1790-71c0-8d24-d8f4d40ec13c	01a08d95-178f-7159-981e-6c8d65438174	\N	01a08d95-178f-7159-981e-6c8d65438174	credential	\N	\N	\N	\N	\N	\N	cf12a28d5432b85f044fc4fbfae2f306:18c5dfc6b03090319677ff1887fbb9e0777b1e4ccf2da79811b3e220a2b2a0d0a84d52f37694cdb75b512fa81c4510b023ef26aedb5d872e25901a9aa037510e	2026-09-11 06:09:13.487+07	2026-09-11 06:09:13.487+07
01a08d95-17c4-77fc-9b53-d40547cf7af8	01a08d95-17c3-74fa-8836-1c1c0d91515e	\N	01a08d95-17c3-74fa-8836-1c1c0d91515e	credential	\N	\N	\N	\N	\N	\N	eb86d56700b414db41993a7a1c75b042:af2c2d2e0a2cb614f659339f7b99fca8d879c027076922441272e5a18baa249e71cf9fd9874c77b04d8fd1406e05774596d834e206c6a6830fd036bf5dac5c2e	2026-09-11 06:09:13.54+07	2026-09-11 06:09:13.54+07
01a08d95-1805-7b01-bcc6-b56b06f0fe3c	01a08d95-1804-773a-bd31-f96973ceebae	\N	01a08d95-1804-773a-bd31-f96973ceebae	credential	\N	\N	\N	\N	\N	\N	e4128719454d6400ac06a1b7dc9adafb:ba5cf636a68d9aa0526cf21dafe7daa887a4ff5d84153bc00e368e802bea8cb5917e6fa160339486893daae21a484faf055229b989acc636a68277637068a575	2026-09-11 06:09:13.605+07	2026-09-11 06:09:13.605+07
01a08d95-183b-7f8c-bde1-5791cd04734d	01a08d95-183a-7a1b-8c76-38e1bb239b3c	\N	01a08d95-183a-7a1b-8c76-38e1bb239b3c	credential	\N	\N	\N	\N	\N	\N	719b678c1402f8afcb552498f90b5327:c9f04f961df02b3b644649c17d48ec7134b55e038eea0ed7d6213dc22384ca41c2a832ea8ed6684e4288000b2d743f6dc578285c04145f1dde67f9848735cc39	2026-09-11 06:09:13.659+07	2026-09-11 06:09:13.659+07
01a08d95-1874-7a80-b6d0-b3f3626cf043	01a08d95-1873-78c9-86b6-289e0eebc295	\N	01a08d95-1873-78c9-86b6-289e0eebc295	credential	\N	\N	\N	\N	\N	\N	1a66ec31701ca235b59cb31c4fbf2b7b:c35d5526d23f1423b87f931dda5b5e6ece3133ca77a37911b9a3d1288571d860398e4525f91cabe6e7c96581b704bd10a38ddcb1384e46de9cd5474bc09f6909	2026-09-11 06:09:13.716+07	2026-09-11 06:09:13.716+07
01a08d95-18ab-79d6-8659-a8092097a322	01a08d95-18aa-799c-ae11-7a6e71911df6	\N	01a08d95-18aa-799c-ae11-7a6e71911df6	credential	\N	\N	\N	\N	\N	\N	9fb8a1b84212a180940834b4f14b3f54:2e80c92bf4696ee9ad99d33009d440e57d1b535e4b5ed0921a4cc0b937643e83c56efe569e4be2ad6ba8e81e73eefaf2a357aa278ad6b65e2f06b222ef943c58	2026-09-11 06:09:13.771+07	2026-09-11 06:09:13.771+07
\.


--
-- Data for Name: application_services; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.application_services (application_service_id, sub_department_id, name, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-c9a85f85c35c	01a063fa-e4a6-703e-8ecf-94bee3c8e046	AMS	2026-09-11 06:09:13.786213+07	2026-09-11 06:09:13.786213+07
01a063fa-e4a6-703e-8ecf-cce5f1ed59ce	01a063fa-e4a6-703e-8ecf-94bee3c8e046	ESPPD	2026-09-11 06:09:13.786213+07	2026-09-11 06:09:13.786213+07
01a063fa-e4a6-703e-8ecf-d2df473f06bb	01a063fa-e4a6-703e-8ecf-94bee3c8e046	PLN Daily	2026-09-11 06:09:13.786213+07	2026-09-11 06:09:13.786213+07
\.


--
-- Data for Name: departements; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.departements (departement_id, organization_id, name, user_id, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-8b267a3b47e9	01a063fa-e4a6-703e-8ecf-7da7cb01ce2c	Digitalisasi PLN 2	01a08d95-136a-73a1-9085-786c189873ab	2026-09-11 06:09:13.782269+07	2026-09-11 06:09:13.782269+07
01a063fa-e4a6-703e-8ecf-8c3b11ace2fe	01a063fa-e4a6-703e-8ecf-7da7cb01ce2c	Operasi PLN	01a08d95-13b0-762c-a824-584906ef8548	2026-09-11 06:09:13.782269+07	2026-09-11 06:09:13.782269+07
01a063fa-e4a6-703e-8ecf-9059fbe14ca8	01a063fa-e4a6-703e-8ecf-8432c1a6eceb	Outsourcing etc	01a08d95-13b0-762c-a824-584906ef8548	2026-09-11 06:09:13.782269+07	2026-09-11 06:09:13.782269+07
\.


--
-- Data for Name: help_topics; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.help_topics (help_topic_id, application_service_id, title, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ed0-0fd44cc78150	01a063fa-e4a6-703e-8ecf-c9a85f85c35c	Perubahan Data	2026-09-11 06:09:13.788921+07	2026-09-11 06:09:13.788921+07
01a063fa-e4a6-703e-8ed0-135d13fdbcf2	01a063fa-e4a6-703e-8ecf-c9a85f85c35c	penambahan user	2026-09-11 06:09:13.788921+07	2026-09-11 06:09:13.788921+07
01a063fa-e4a6-703e-8ed0-149f3e4c8cfc	01a063fa-e4a6-703e-8ecf-cce5f1ed59ce	Perubahan Data	2026-09-11 06:09:13.788921+07	2026-09-11 06:09:13.788921+07
01a063fa-e4a6-703e-8ed0-1b193bc1f7be	01a063fa-e4a6-703e-8ecf-cce5f1ed59ce	penambahan user	2026-09-11 06:09:13.788921+07	2026-09-11 06:09:13.788921+07
01a063fa-e4a6-703e-8ed0-1ce0f2d3dd07	01a063fa-e4a6-703e-8ecf-d2df473f06bb	Perubahan Data	2026-09-11 06:09:13.788921+07	2026-09-11 06:09:13.788921+07
01a063fa-e4a6-703e-8ed0-205dd159ff2e	01a063fa-e4a6-703e-8ecf-d2df473f06bb	penambahan user	2026-09-11 06:09:13.788921+07	2026-09-11 06:09:13.788921+07
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.organizations (organization_id, name, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-7da7cb01ce2c	PLN Icon Plus	2026-09-11 06:09:13.780626+07	2026-09-11 06:09:13.780626+07
01a063fa-e4a6-703e-8ecf-8003d9a19f78	PLN Pusat	2026-09-11 06:09:13.780626+07	2026-09-11 06:09:13.780626+07
01a063fa-e4a6-703e-8ecf-8432c1a6eceb	Perusahaan External	2026-09-11 06:09:13.780626+07	2026-09-11 06:09:13.780626+07
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.sessions (session_id, user_id, token, expires_at, ip_address, user_agent, impersonated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sub_departments; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.sub_departments (sub_department_id, name, departement_id, user_id, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-94bee3c8e046	Aplikasi PLN Korporat dan Pelayanan Pelanggan 1	01a063fa-e4a6-703e-8ecf-8b267a3b47e9	01a08d95-141c-7bff-86b6-22ef2d14972a	2026-09-11 06:09:13.783179+07	2026-09-11 06:09:13.783179+07
01a063fa-e4a6-703e-8ecf-9a45c6bd98f7	Aplikasi PLN Korporat dan Pelayanan Pelanggan 2	01a063fa-e4a6-703e-8ecf-8b267a3b47e9	01a08d95-1488-75bc-938e-9d343f1816fe	2026-09-11 06:09:13.783179+07	2026-09-11 06:09:13.783179+07
01a063fa-e4a6-703e-8ecf-9c7c57033d89	Aplikasi PLN Korporat dan Pelayanan Pelanggan 3	01a063fa-e4a6-703e-8ecf-8b267a3b47e9	01a08d95-1452-7b0e-827c-62500229a3f1	2026-09-11 06:09:13.783179+07	2026-09-11 06:09:13.783179+07
01a063fa-e4a6-703e-8ecf-a211240e1881	PLN Operasi	01a063fa-e4a6-703e-8ecf-8c3b11ace2fe	01a08d95-1804-773a-bd31-f96973ceebae	2026-09-11 06:09:13.783179+07	2026-09-11 06:09:13.783179+07
\.


--
-- Data for Name: sub_teams; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.sub_teams (sub_team_id, team_id, name, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-c37ac34a9664	01a063fa-e4a6-703e-8ecf-a61c08f5250a	DBA	2026-09-11 06:09:13.784626+07	2026-09-11 06:09:13.784626+07
01a063fa-e4a6-703e-8ecf-c72fd338bf16	01a063fa-e4a6-703e-8ecf-a61c08f5250a	DEVOPS	2026-09-11 06:09:13.784626+07	2026-09-11 06:09:13.784626+07
\.


--
-- Data for Name: subfields; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.subfields (subfield_id, name) FROM stdin;
\.


--
-- Data for Name: team_leaders; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.team_leaders (team_leader_id, user_id, team_id, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-b3c3dd74e66d	01a08d95-14bd-7363-add4-0d5bb590a383	01a063fa-e4a6-703e-8ecf-a61c08f5250a	2026-09-11 06:09:13.785258+07	2026-09-11 06:09:13.785258+07
01a063fa-e4a6-703e-8ecf-b61b9a844a29	01a08d95-14f2-7cfb-93e0-4943ee3849a9	01a063fa-e4a6-703e-8ecf-a61c08f5250a	2026-09-11 06:09:13.785258+07	2026-09-11 06:09:13.785258+07
01a063fa-e4a6-703e-8ecf-b996b71fdedd	01a08d95-1528-7bdb-8d2f-0058cf681424	01a063fa-e4a6-703e-8ecf-a61c08f5250a	2026-09-11 06:09:13.785258+07	2026-09-11 06:09:13.785258+07
01a063fa-e4a6-703e-8ecf-be64606843e8	01a08d95-183a-7a1b-8c76-38e1bb239b3c	01a063fa-e4a6-703e-8ecf-ae7257ac25a9	2026-09-11 06:09:13.785258+07	2026-09-11 06:09:13.785258+07
\.


--
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.team_members (team_member_id, user_id, team_id, sub_team_id, "roleMember", created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-d785be58ffaf	01a08d95-155d-7b06-a8cc-55c89c5cca0c	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c37ac34a9664	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-d83566e4c943	01a08d95-15a0-75ab-9cb8-fcc9be1d721f	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c37ac34a9664	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-dcc43762ac22	01a08d95-15d7-7c2c-a013-116b7d67a0a3	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c72fd338bf16	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-e2415ab62553	01a08d95-160c-73f0-afa3-41432b23a126	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c72fd338bf16	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-e45249c9bd8a	01a08d95-1641-7407-a5de-eeeac8ab6d42	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c37ac34a9664	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-e99dc3a08342	01a08d95-1675-78a1-900e-278ef0d89815	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c37ac34a9664	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-ec84707a262b	01a08d95-16b3-7d4c-9fa3-0f7ae1a8bb2e	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c72fd338bf16	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-f09de2306c1d	01a08d95-16e8-7493-a027-462e149249b7	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c72fd338bf16	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-f6eccb908735	01a08d95-171c-7e16-8175-6adc43499338	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c37ac34a9664	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-f933d38e9d9e	01a08d95-175a-7e9b-869e-c900a83d9af8	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c37ac34a9664	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ecf-ffff55754ad1	01a08d95-178f-7159-981e-6c8d65438174	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c72fd338bf16	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ed0-03e4d13e0fe8	01a08d95-17c3-74fa-8836-1c1c0d91515e	01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-c72fd338bf16	executioner	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ed0-0491a8a66764	01a08d95-1873-78c9-86b6-289e0eebc295	01a063fa-e4a6-703e-8ecf-ae7257ac25a9	\N	requester	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
01a063fa-e4a6-703e-8ed0-0ad6138050b5	01a08d95-18aa-799c-ae11-7a6e71911df6	01a063fa-e4a6-703e-8ecf-ae7257ac25a9	\N	requester	2026-09-11 06:09:13.787413+07	2026-09-11 06:09:13.787413+07
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.teams (team_id, sub_department_id, name, created_at, updated_at) FROM stdin;
01a063fa-e4a6-703e-8ecf-a61c08f5250a	01a063fa-e4a6-703e-8ecf-94bee3c8e046	Seksi Operasional	2026-09-11 06:09:13.784033+07	2026-09-11 06:09:13.784033+07
01a063fa-e4a6-703e-8ecf-a8f9d623b606	01a063fa-e4a6-703e-8ecf-94bee3c8e046	Seksi Pengembangan	2026-09-11 06:09:13.784033+07	2026-09-11 06:09:13.784033+07
01a063fa-e4a6-703e-8ecf-ae7257ac25a9	01a063fa-e4a6-703e-8ecf-a211240e1881	Seksi Support Qonita	2026-09-11 06:09:13.784033+07	2026-09-11 06:09:13.784033+07
\.


--
-- Data for Name: ticket_assignments; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.ticket_assignments (ticket_assignment_id, ticket_id, assignee_member_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: ticket_chat_attachments; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.ticket_chat_attachments (ticket_chat_attachment_id, ticket_chat_id, title, url_file, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: ticket_chats; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.ticket_chats (ticket_chat_id, ticket_id, team_member_id, body_chat, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.tickets (ticket_id, requester_member_id, help_topic_id, status, priority, title, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.users (user_id, name, email, email_verified, image, created_at, updated_at, role, banned, ban_reason, ban_expires) FROM stdin;
01a08d95-136a-73a1-9085-786c189873ab	Hermawan Asmoko	hermawan.asmoko@iconpln.co.id	f	\N	2026-09-11 06:09:12.163+07	2026-09-11 06:09:12.163+07	\N	f	\N	\N
01a08d95-13b0-762c-a824-584906ef8548	Fulan VP Lain	fulan.vp.lain@iconpln.co.id	f	\N	2026-09-11 06:09:12.495+07	2026-09-11 06:09:12.495+07	\N	f	\N	\N
01a08d95-13e6-79d9-8e07-194fa0f4d19a	Yora Yunita	yora.yunita@iconpln.co.id	f	\N	2026-09-11 06:09:12.549+07	2026-09-11 06:09:12.549+07	\N	f	\N	\N
01a08d95-141c-7bff-86b6-22ef2d14972a	Christland P. Simatupang	christland.p.simatupang@iconpln.co.id	f	\N	2026-09-11 06:09:12.604+07	2026-09-11 06:09:12.604+07	\N	f	\N	\N
01a08d95-1452-7b0e-827c-62500229a3f1	Andrian	andrian@iconpln.co.id	f	\N	2026-09-11 06:09:12.658+07	2026-09-11 06:09:12.658+07	\N	f	\N	\N
01a08d95-1488-75bc-938e-9d343f1816fe	Arief Man	arief.man@iconpln.co.id	f	\N	2026-09-11 06:09:12.711+07	2026-09-11 06:09:12.711+07	\N	f	\N	\N
01a08d95-14bd-7363-add4-0d5bb590a383	Fiqih Alfito	fiqih.alfito@iconpln.co.id	f	\N	2026-09-11 06:09:12.764+07	2026-09-11 06:09:12.764+07	\N	f	\N	\N
01a08d95-14f2-7cfb-93e0-4943ee3849a9	M. Vickya Ramadhan	m.vickya.ramadhan@iconpln.co.id	f	\N	2026-09-11 06:09:12.818+07	2026-09-11 06:09:12.818+07	\N	f	\N	\N
01a08d95-1528-7bdb-8d2f-0058cf681424	Herri	herri@iconpln.co.id	f	\N	2026-09-11 06:09:12.872+07	2026-09-11 06:09:12.872+07	\N	f	\N	\N
01a08d95-155d-7b06-a8cc-55c89c5cca0c	DBA AAA K1	dba.aaa.k1@iconpln.co.id	f	\N	2026-09-11 06:09:12.925+07	2026-09-11 06:09:12.925+07	\N	f	\N	\N
01a08d95-15a0-75ab-9cb8-fcc9be1d721f	DBA BBB K1	dba.bbb.k1@iconpln.co.id	f	\N	2026-09-11 06:09:12.991+07	2026-09-11 06:09:12.991+07	\N	f	\N	\N
01a08d95-15d7-7c2c-a013-116b7d67a0a3	Devops AAA K1	devops.aaa.k1@iconpln.co.id	f	\N	2026-09-11 06:09:13.047+07	2026-09-11 06:09:13.047+07	\N	f	\N	\N
01a08d95-160c-73f0-afa3-41432b23a126	Devops BBB K1	devops.bbb.k1@iconpln.co.id	f	\N	2026-09-11 06:09:13.099+07	2026-09-11 06:09:13.099+07	\N	f	\N	\N
01a08d95-1641-7407-a5de-eeeac8ab6d42	DBA AAA K2	dba.aaa.k2@iconpln.co.id	f	\N	2026-09-11 06:09:13.152+07	2026-09-11 06:09:13.152+07	\N	f	\N	\N
01a08d95-1675-78a1-900e-278ef0d89815	DBA BBB K2	dba.bbb.k2@iconpln.co.id	f	\N	2026-09-11 06:09:13.205+07	2026-09-11 06:09:13.205+07	\N	f	\N	\N
01a08d95-16b3-7d4c-9fa3-0f7ae1a8bb2e	Devops AAA K2	devops.aaa.k2@iconpln.co.id	f	\N	2026-09-11 06:09:13.267+07	2026-09-11 06:09:13.267+07	\N	f	\N	\N
01a08d95-16e8-7493-a027-462e149249b7	Devops BBB K2	devops.bbb.k2@iconpln.co.id	f	\N	2026-09-11 06:09:13.319+07	2026-09-11 06:09:13.319+07	\N	f	\N	\N
01a08d95-171c-7e16-8175-6adc43499338	DBA AAA K3	dba.aaa.k3@iconpln.co.id	f	\N	2026-09-11 06:09:13.372+07	2026-09-11 06:09:13.372+07	\N	f	\N	\N
01a08d95-175a-7e9b-869e-c900a83d9af8	DBA BBB K3	dba.bbb.k3@iconpln.co.id	f	\N	2026-09-11 06:09:13.434+07	2026-09-11 06:09:13.434+07	\N	f	\N	\N
01a08d95-178f-7159-981e-6c8d65438174	Devops AAA K3	devops.aaa.k3@iconpln.co.id	f	\N	2026-09-11 06:09:13.486+07	2026-09-11 06:09:13.486+07	\N	f	\N	\N
01a08d95-17c3-74fa-8836-1c1c0d91515e	Devops BBB K3	devops.bbb.k3@iconpln.co.id	f	\N	2026-09-11 06:09:13.538+07	2026-09-11 06:09:13.538+07	\N	f	\N	\N
01a08d95-1804-773a-bd31-f96973ceebae	Atasan Qonita	atasan.qonita@iconpln.co.id	f	\N	2026-09-11 06:09:13.603+07	2026-09-11 06:09:13.603+07	\N	f	\N	\N
01a08d95-183a-7a1b-8c76-38e1bb239b3c	Qonita support	qonita.support@iconpln.co.id	f	\N	2026-09-11 06:09:13.658+07	2026-09-11 06:09:13.658+07	\N	f	\N	\N
01a08d95-1873-78c9-86b6-289e0eebc295	aaa support	aaa.support@iconpln.co.id	f	\N	2026-09-11 06:09:13.715+07	2026-09-11 06:09:13.715+07	\N	f	\N	\N
01a08d95-18aa-799c-ae11-7a6e71911df6	bbb support	bbb.support@iconpln.co.id	f	\N	2026-09-11 06:09:13.77+07	2026-09-11 06:09:13.77+07	\N	f	\N	\N
\.


--
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: fiqih
--

COPY public.verifications (verification_id, identifier, value, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);


--
-- Name: application_services application_services_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.application_services
    ADD CONSTRAINT application_services_pkey PRIMARY KEY (application_service_id);


--
-- Name: departements departements_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_pkey PRIMARY KEY (departement_id);


--
-- Name: help_topics help_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.help_topics
    ADD CONSTRAINT help_topics_pkey PRIMARY KEY (help_topic_id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (organization_id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sub_departments sub_departments_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sub_departments
    ADD CONSTRAINT sub_departments_pkey PRIMARY KEY (sub_department_id);


--
-- Name: sub_teams sub_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sub_teams
    ADD CONSTRAINT sub_teams_pkey PRIMARY KEY (sub_team_id);


--
-- Name: subfields subfields_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.subfields
    ADD CONSTRAINT subfields_pkey PRIMARY KEY (subfield_id);


--
-- Name: team_leaders team_leaders_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_leaders
    ADD CONSTRAINT team_leaders_pkey PRIMARY KEY (team_leader_id);


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (team_member_id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: ticket_assignments ticket_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT ticket_assignments_pkey PRIMARY KEY (ticket_assignment_id);


--
-- Name: ticket_chat_attachments ticket_chat_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_chat_attachments
    ADD CONSTRAINT ticket_chat_attachments_pkey PRIMARY KEY (ticket_chat_attachment_id);


--
-- Name: ticket_chats ticket_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_chats
    ADD CONSTRAINT ticket_chats_pkey PRIMARY KEY (ticket_chat_id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticket_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (verification_id);


--
-- Name: accountsTable_issuer_providerAccountId_uidx; Type: INDEX; Schema: public; Owner: fiqih
--

CREATE UNIQUE INDEX "accountsTable_issuer_providerAccountId_uidx" ON public.accounts USING btree (issuer, provider_account_id);


--
-- Name: accountsTable_userId_idx; Type: INDEX; Schema: public; Owner: fiqih
--

CREATE INDEX "accountsTable_userId_idx" ON public.accounts USING btree (user_id);


--
-- Name: sessionsTable_userId_idx; Type: INDEX; Schema: public; Owner: fiqih
--

CREATE INDEX "sessionsTable_userId_idx" ON public.sessions USING btree (user_id);


--
-- Name: verificationsTable_identifier_idx; Type: INDEX; Schema: public; Owner: fiqih
--

CREATE INDEX "verificationsTable_identifier_idx" ON public.verifications USING btree (identifier);


--
-- Name: accounts accounts_user_id_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: application_services application_services_UCklrcvxOmvi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.application_services
    ADD CONSTRAINT "application_services_UCklrcvxOmvi_fkey" FOREIGN KEY (sub_department_id) REFERENCES public.sub_departments(sub_department_id);


--
-- Name: departements departements_organization_id_organizations_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_organization_id_organizations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(organization_id);


--
-- Name: departements departements_user_id_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_user_id_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: help_topics help_topics_1tnbRcHVjfiQ_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.help_topics
    ADD CONSTRAINT "help_topics_1tnbRcHVjfiQ_fkey" FOREIGN KEY (application_service_id) REFERENCES public.application_services(application_service_id);


--
-- Name: sessions sessions_user_id_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: sub_departments sub_departments_departement_id_departements_departement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sub_departments
    ADD CONSTRAINT sub_departments_departement_id_departements_departement_id_fkey FOREIGN KEY (departement_id) REFERENCES public.departements(departement_id);


--
-- Name: sub_departments sub_departments_user_id_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sub_departments
    ADD CONSTRAINT sub_departments_user_id_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: sub_teams sub_teams_team_id_teams_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.sub_teams
    ADD CONSTRAINT sub_teams_team_id_teams_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id);


--
-- Name: team_leaders team_leaders_team_id_teams_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_leaders
    ADD CONSTRAINT team_leaders_team_id_teams_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id);


--
-- Name: team_leaders team_leaders_user_id_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_leaders
    ADD CONSTRAINT team_leaders_user_id_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: team_members team_members_sub_team_id_sub_teams_sub_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_sub_team_id_sub_teams_sub_team_id_fkey FOREIGN KEY (sub_team_id) REFERENCES public.sub_teams(sub_team_id);


--
-- Name: team_members team_members_team_id_teams_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_teams_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(team_id);


--
-- Name: team_members team_members_user_id_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_user_id_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: teams teams_sub_department_id_sub_departments_sub_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_sub_department_id_sub_departments_sub_department_id_fkey FOREIGN KEY (sub_department_id) REFERENCES public.sub_departments(sub_department_id);


--
-- Name: ticket_assignments ticket_assignments_ticket_id_tickets_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT ticket_assignments_ticket_id_tickets_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(ticket_id);


--
-- Name: ticket_assignments ticket_assignments_vELrAFVQAsuP_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_assignments
    ADD CONSTRAINT "ticket_assignments_vELrAFVQAsuP_fkey" FOREIGN KEY (assignee_member_id) REFERENCES public.team_members(team_member_id);


--
-- Name: ticket_chat_attachments ticket_chat_attachments_kOvTmfWB8DHP_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_chat_attachments
    ADD CONSTRAINT "ticket_chat_attachments_kOvTmfWB8DHP_fkey" FOREIGN KEY (ticket_chat_id) REFERENCES public.ticket_chats(ticket_chat_id);


--
-- Name: ticket_chats ticket_chats_team_member_id_team_members_team_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_chats
    ADD CONSTRAINT ticket_chats_team_member_id_team_members_team_member_id_fkey FOREIGN KEY (team_member_id) REFERENCES public.team_members(team_member_id);


--
-- Name: ticket_chats ticket_chats_ticket_id_tickets_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.ticket_chats
    ADD CONSTRAINT ticket_chats_ticket_id_tickets_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(ticket_id);


--
-- Name: tickets tickets_help_topic_id_help_topics_help_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_help_topic_id_help_topics_help_topic_id_fkey FOREIGN KEY (help_topic_id) REFERENCES public.help_topics(help_topic_id);


--
-- Name: tickets tickets_requester_member_id_team_members_team_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fiqih
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_requester_member_id_team_members_team_member_id_fkey FOREIGN KEY (requester_member_id) REFERENCES public.team_members(team_member_id);


--
-- PostgreSQL database dump complete
--

\unrestrict o3tzwOuBKtMFCSQ6EICPvbaLyp9UcWGm1hOzPqjtA2ohwlgazaTPhwOPiEbiETT

--
-- PostgreSQL database cluster dump complete
--

