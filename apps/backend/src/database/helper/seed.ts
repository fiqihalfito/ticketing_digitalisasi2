import { db } from "../connect";
import {
    applicationServicesTable,
    departementsTable,
    helpTopicsTable,
    organizationsTable,
    subDepartmentsTable,
    subTeamsTable,
    teamLeadersTable,
    teamMembersTable,
    teamsTable,
    usersTable,
} from "../schema";
import { truncateAll } from "./truncate-data";
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000/auth/api" // The base URL of your auth server
})

// =========================================================================
// Users
// =========================================================================

await authClient.signUp.email({
    email: "hermawan.asmoko@iconpln.co.id",
    name: "Hermawan Asmoko",
    password: "12345678"
})

const userData: typeof usersTable.$inferInsert[] = [
    {
        id: "01a063fa-e4a5-73e6-b24e-86ed8da0d11f",
        name: "Hermawan Asmoko",
        email: "hermawan.asmoko@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-1f343fc6bf17",
        name: "Fulan VP Lain",
        email: "fulan.vp.lain@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-237110d96a42",
        name: "Yora Yunita",
        email: "yora.yunita@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-260567b955df",
        name: "Christland P. Simatupang",
        email: "christland.p.simatupang@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-2adfd381b125",
        name: "Andrian",
        email: "andrian@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-2c5fb78c3188",
        name: "Arief Man",
        email: "arief.man@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-32b598c087ef",
        name: "Fiqih Alfito",
        email: "fiqih.alfito@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-352313c1d24a",
        name: "M. Vickya Ramadhan",
        email: "m.vickya.ramadhan@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-387d56b6789c",
        name: "Herri",
        email: "herri@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-3de04f955533",
        name: "DBA AAA K1",
        email: "dba.aaa.k1@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-4269ef37545c",
        name: "DBA BBB K1",
        email: "dba.bbb.k1@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-46e00166b1f4",
        name: "Devops AAA K1",
        email: "devops.aaa.k1@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-49eedff59546",
        name: "Devops BBB K1",
        email: "devops.bbb.k1@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-4ddce87752c3",
        name: "DBA AAA K2",
        email: "dba.aaa.k2@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-502cbf947a6c",
        name: "DBA BBB K2",
        email: "dba.bbb.k2@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-54fc88297f83",
        name: "Devops AAA K2",
        email: "devops.aaa.k2@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-59aa6f111853",
        name: "Devops BBB K2",
        email: "devops.bbb.k2@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-5c7a551bccd0",
        name: "DBA AAA K3",
        email: "dba.aaa.k3@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-63f8c8d1c62c",
        name: "DBA BBB K3",
        email: "dba.bbb.k3@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-654ee2793ccb",
        name: "Devops AAA K3",
        email: "devops.aaa.k3@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-6b22a84e125f",
        name: "Devops BBB K3",
        email: "devops.bbb.k3@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-6ecbc6bed71c",
        name: "Atasan Qonita",
        email: "atasan.qonita@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-7246573826bb",
        name: "Qonita support",
        email: "qonita.support@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-77e3fc14e6bd",
        name: "aaa support",
        email: "aaa.support@iconpln.co.id",
        emailVerified: true,
    },
    {
        id: "01a063fa-e4a6-703e-8ecf-7ad4e0f01801",
        name: "bbb support",
        email: "bbb.support@iconpln.co.id",
        emailVerified: true,
    },
];

// convenience lookup by name -> id, used only while building this file
const USER = {
    hermawanAsmoko: "01a063fa-e4a5-73e6-b24e-86ed8da0d11f",
    fulanVpLain: "01a063fa-e4a6-703e-8ecf-1f343fc6bf17",
    yoraYunita: "01a063fa-e4a6-703e-8ecf-237110d96a42",
    christland: "01a063fa-e4a6-703e-8ecf-260567b955df",
    andrian: "01a063fa-e4a6-703e-8ecf-2adfd381b125",
    ariefMan: "01a063fa-e4a6-703e-8ecf-2c5fb78c3188",
    fiqihAlfito: "01a063fa-e4a6-703e-8ecf-32b598c087ef",
    vickyaRamadhan: "01a063fa-e4a6-703e-8ecf-352313c1d24a",
    herri: "01a063fa-e4a6-703e-8ecf-387d56b6789c",
    dbaAaaK1: "01a063fa-e4a6-703e-8ecf-3de04f955533",
    dbaBbbK1: "01a063fa-e4a6-703e-8ecf-4269ef37545c",
    devopsAaaK1: "01a063fa-e4a6-703e-8ecf-46e00166b1f4",
    devopsBbbK1: "01a063fa-e4a6-703e-8ecf-49eedff59546",
    dbaAaaK2: "01a063fa-e4a6-703e-8ecf-4ddce87752c3",
    dbaBbbK2: "01a063fa-e4a6-703e-8ecf-502cbf947a6c",
    devopsAaaK2: "01a063fa-e4a6-703e-8ecf-54fc88297f83",
    devopsBbbK2: "01a063fa-e4a6-703e-8ecf-59aa6f111853",
    dbaAaaK3: "01a063fa-e4a6-703e-8ecf-5c7a551bccd0",
    dbaBbbK3: "01a063fa-e4a6-703e-8ecf-63f8c8d1c62c",
    devopsAaaK3: "01a063fa-e4a6-703e-8ecf-654ee2793ccb",
    devopsBbbK3: "01a063fa-e4a6-703e-8ecf-6b22a84e125f",
    atasanQonita: "01a063fa-e4a6-703e-8ecf-6ecbc6bed71c",
    qonitaSupport: "01a063fa-e4a6-703e-8ecf-7246573826bb",
    aaaSupport: "01a063fa-e4a6-703e-8ecf-77e3fc14e6bd",
    bbbSupport: "01a063fa-e4a6-703e-8ecf-7ad4e0f01801",
} as const;

// =========================================================================
// Organizations
// =========================================================================

const organizationData: typeof organizationsTable.$inferInsert[] = [
    { organizationId: "01a063fa-e4a6-703e-8ecf-7da7cb01ce2c", name: "PLN Icon Plus" },
    { organizationId: "01a063fa-e4a6-703e-8ecf-8003d9a19f78", name: "PLN Pusat" },
    { organizationId: "01a063fa-e4a6-703e-8ecf-8432c1a6eceb", name: "Perusahaan External" },
];

const ORG = {
    plnIconPlus: "01a063fa-e4a6-703e-8ecf-7da7cb01ce2c",
    plnPusat: "01a063fa-e4a6-703e-8ecf-8003d9a19f78",
    perusahaanExternal: "01a063fa-e4a6-703e-8ecf-8432c1a6eceb",
} as const;

// =========================================================================
// Departements
// =========================================================================

const departementData: typeof departementsTable.$inferInsert[] = [
    {
        departementId: "01a063fa-e4a6-703e-8ecf-8b267a3b47e9",
        name: "Digitalisasi PLN 2",
        organizationId: ORG.plnIconPlus,
        userId: USER.hermawanAsmoko,
    },
    {
        departementId: "01a063fa-e4a6-703e-8ecf-8c3b11ace2fe",
        name: "Operasi PLN",
        organizationId: ORG.plnIconPlus,
        userId: USER.fulanVpLain,
    },
    {
        departementId: "01a063fa-e4a6-703e-8ecf-9059fbe14ca8",
        name: "Outsourcing etc",
        organizationId: ORG.perusahaanExternal,
        // no user specified in the requirement for this department
        userId: USER.fulanVpLain,
    },
];

const DEPT = {
    digitalisasiPln2: "01a063fa-e4a6-703e-8ecf-8b267a3b47e9",
    operasiPln: "01a063fa-e4a6-703e-8ecf-8c3b11ace2fe",
    outsourcingEtc: "01a063fa-e4a6-703e-8ecf-9059fbe14ca8",
} as const;

// =========================================================================
// Sub Departements
// =========================================================================

const subDepartmentData: typeof subDepartmentsTable.$inferInsert[] = [
    {
        subDepartmentId: "01a063fa-e4a6-703e-8ecf-94bee3c8e046",
        name: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 1",
        departementId: DEPT.digitalisasiPln2,
        userId: USER.christland,
    },
    {
        subDepartmentId: "01a063fa-e4a6-703e-8ecf-9a45c6bd98f7",
        name: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 2",
        departementId: DEPT.digitalisasiPln2,
        userId: USER.ariefMan,
    },
    {
        subDepartmentId: "01a063fa-e4a6-703e-8ecf-9c7c57033d89",
        name: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 3",
        departementId: DEPT.digitalisasiPln2,
        userId: USER.andrian,
    },
    {
        subDepartmentId: "01a063fa-e4a6-703e-8ecf-a211240e1881",
        name: "PLN Operasi",
        departementId: DEPT.operasiPln,
        userId: USER.atasanQonita,
    },
];

const SUBDEPT = {
    pelayananPelanggan1: "01a063fa-e4a6-703e-8ecf-94bee3c8e046",
    pelayananPelanggan2: "01a063fa-e4a6-703e-8ecf-9a45c6bd98f7",
    pelayananPelanggan3: "01a063fa-e4a6-703e-8ecf-9c7c57033d89",
    plnOperasi: "01a063fa-e4a6-703e-8ecf-a211240e1881",
} as const;

// =========================================================================
// Teams
// =========================================================================

const teamData: typeof teamsTable.$inferInsert[] = [
    {
        teamId: "01a063fa-e4a6-703e-8ecf-a61c08f5250a",
        name: "Seksi Operasional",
        subDepartmentId: SUBDEPT.pelayananPelanggan1,
    },
    {
        teamId: "01a063fa-e4a6-703e-8ecf-a8f9d623b606",
        name: "Seksi Pengembangan",
        subDepartmentId: SUBDEPT.pelayananPelanggan1,
    },
    {
        teamId: "01a063fa-e4a6-703e-8ecf-ae7257ac25a9",
        name: "Seksi Support Qonita",
        subDepartmentId: SUBDEPT.plnOperasi,
    },
];

const TEAM = {
    seksiOperasional: "01a063fa-e4a6-703e-8ecf-a61c08f5250a",
    seksiPengembangan: "01a063fa-e4a6-703e-8ecf-a8f9d623b606",
    seksiSupportQonita: "01a063fa-e4a6-703e-8ecf-ae7257ac25a9",
} as const;

// =========================================================================
// Sub Teams
// =========================================================================

const subTeamData: typeof subTeamsTable.$inferInsert[] = [
    { subTeamId: "01a063fa-e4a6-703e-8ecf-c37ac34a9664", name: "DBA", teamId: TEAM.seksiOperasional },
    { subTeamId: "01a063fa-e4a6-703e-8ecf-c72fd338bf16", name: "DEVOPS", teamId: TEAM.seksiOperasional },
];

const SUBTEAM = {
    dba: "01a063fa-e4a6-703e-8ecf-c37ac34a9664",
    devops: "01a063fa-e4a6-703e-8ecf-c72fd338bf16",
} as const;

// =========================================================================
// Team Leaders
// =========================================================================

const teamLeaderData: typeof teamLeadersTable.$inferInsert[] = [
    {
        teamLeaderId: "01a063fa-e4a6-703e-8ecf-b3c3dd74e66d",
        userId: USER.fiqihAlfito,
        teamId: TEAM.seksiOperasional,
    },
    {
        teamLeaderId: "01a063fa-e4a6-703e-8ecf-b61b9a844a29",
        userId: USER.vickyaRamadhan,
        teamId: TEAM.seksiOperasional,
    },
    {
        teamLeaderId: "01a063fa-e4a6-703e-8ecf-b996b71fdedd",
        userId: USER.herri,
        teamId: TEAM.seksiOperasional,
    },
    {
        teamLeaderId: "01a063fa-e4a6-703e-8ecf-be64606843e8",
        userId: USER.qonitaSupport,
        teamId: TEAM.seksiSupportQonita,
    },
];

// =========================================================================
// Application Services
// =========================================================================

const applicationServiceData: typeof applicationServicesTable.$inferInsert[] = [
    { applicationServiceId: "01a063fa-e4a6-703e-8ecf-c9a85f85c35c", name: "AMS", subDepartmentId: SUBDEPT.pelayananPelanggan1 },
    { applicationServiceId: "01a063fa-e4a6-703e-8ecf-cce5f1ed59ce", name: "ESPPD", subDepartmentId: SUBDEPT.pelayananPelanggan1 },
    { applicationServiceId: "01a063fa-e4a6-703e-8ecf-d2df473f06bb", name: "PLN Daily", subDepartmentId: SUBDEPT.pelayananPelanggan1 },
];

const APPSVC = {
    ams: "01a063fa-e4a6-703e-8ecf-c9a85f85c35c",
    esppd: "01a063fa-e4a6-703e-8ecf-cce5f1ed59ce",
    plnDaily: "01a063fa-e4a6-703e-8ecf-d2df473f06bb",
} as const;

// =========================================================================
// Team Members
// K1/K2/K3 users -> "Seksi Operasional", role "executioner"
// name starting with "DBA" -> sub_team DBA, "Devops" -> sub_team DEVOPS
// aaa support / bbb support -> "Seksi Support Qonita", role "requester", no sub_team
// =========================================================================

const teamMemberData: typeof teamMembersTable.$inferInsert[] = [
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-d785be58ffaf", userId: USER.dbaAaaK1, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.dba, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-d83566e4c943", userId: USER.dbaBbbK1, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.dba, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-dcc43762ac22", userId: USER.devopsAaaK1, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.devops, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-e2415ab62553", userId: USER.devopsBbbK1, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.devops, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-e45249c9bd8a", userId: USER.dbaAaaK2, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.dba, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-e99dc3a08342", userId: USER.dbaBbbK2, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.dba, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-ec84707a262b", userId: USER.devopsAaaK2, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.devops, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-f09de2306c1d", userId: USER.devopsBbbK2, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.devops, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-f6eccb908735", userId: USER.dbaAaaK3, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.dba, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-f933d38e9d9e", userId: USER.dbaBbbK3, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.dba, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ecf-ffff55754ad1", userId: USER.devopsAaaK3, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.devops, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ed0-03e4d13e0fe8", userId: USER.devopsBbbK3, teamId: TEAM.seksiOperasional, subTeamId: SUBTEAM.devops, roleMember: "executioner" },
    { teamMemberId: "01a063fa-e4a6-703e-8ed0-0491a8a66764", userId: USER.aaaSupport, teamId: TEAM.seksiSupportQonita, subTeamId: null, roleMember: "requester" },
    { teamMemberId: "01a063fa-e4a6-703e-8ed0-0ad6138050b5", userId: USER.bbbSupport, teamId: TEAM.seksiSupportQonita, subTeamId: null, roleMember: "requester" },
];

// =========================================================================
// Help Topics
// =========================================================================

const helpTopicData: typeof helpTopicsTable.$inferInsert[] = [
    { helpTopicId: "01a063fa-e4a6-703e-8ed0-0fd44cc78150", title: "Perubahan Data", applicationServiceId: APPSVC.ams },
    { helpTopicId: "01a063fa-e4a6-703e-8ed0-135d13fdbcf2", title: "penambahan user", applicationServiceId: APPSVC.ams },
    { helpTopicId: "01a063fa-e4a6-703e-8ed0-149f3e4c8cfc", title: "Perubahan Data", applicationServiceId: APPSVC.esppd },
    { helpTopicId: "01a063fa-e4a6-703e-8ed0-1b193bc1f7be", title: "penambahan user", applicationServiceId: APPSVC.esppd },
    { helpTopicId: "01a063fa-e4a6-703e-8ed0-1ce0f2d3dd07", title: "Perubahan Data", applicationServiceId: APPSVC.plnDaily },
    { helpTopicId: "01a063fa-e4a6-703e-8ed0-205dd159ff2e", title: "penambahan user", applicationServiceId: APPSVC.plnDaily },
];

// =========================================================================
// Seed runner
// insert order follows FK dependency order
// =========================================================================

async function seed() {
    try {
        await truncateAll();
        console.log("Truncated all tables");

        await db.insert(usersTable).values(userData);
        console.log("✓ users seeded");

        await db.insert(organizationsTable).values(organizationData);
        console.log("✓ organizations seeded");

        await db.insert(departementsTable).values(departementData);
        console.log("✓ departements seeded");

        await db.insert(subDepartmentsTable).values(subDepartmentData);
        console.log("✓ sub_departments seeded");

        await db.insert(teamsTable).values(teamData);
        console.log("✓ teams seeded");

        await db.insert(subTeamsTable).values(subTeamData);
        console.log("✓ sub_teams seeded");

        await db.insert(teamLeadersTable).values(teamLeaderData);
        console.log("✓ team_leaders seeded");

        await db.insert(applicationServicesTable).values(applicationServiceData);
        console.log("✓ application_services seeded");

        await db.insert(teamMembersTable).values(teamMemberData);
        console.log("✓ team_members seeded");

        await db.insert(helpTopicsTable).values(helpTopicData);
        console.log("✓ help_topics seeded");

        console.log("✓ Seed completed");
    } catch (err) {
        console.error("✗ Seed failed:", err);
        process.exit(1);
    }
}

await seed();