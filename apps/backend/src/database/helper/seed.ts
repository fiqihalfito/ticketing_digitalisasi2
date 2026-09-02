import { db } from "../connect";
import {
    departementsTable,
    organizationsTable,
    subDepartmentsTable,
    subTeamsTable,
    teamLeadersTable,
    teamsTable,
    usersTable,
} from "../schema";
import { truncateAll } from "./truncate-data";

// =========================================================================
// USERS
// =========================================================================
const userIds = {
    hermawanAsmoko: "01a05ea9-54cb-7c23-b9c0-8f4f53a9133d",
    fulanVpLain: "01a05ea9-54cc-751e-9916-fbbb2b29dff2",
    yoraYunita: "01a05ea9-54cc-779f-9637-14a7204f0d25",
    christlandPSimatupang: "01a05ea9-54cc-7a68-80e6-f580860b2d23",
    andrian: "01a05ea9-54cc-710e-8ea1-305280d5c586",
    ariefK2: "01a05ea9-54cd-79d4-b0df-2356c8a14ab9",
    fiqihAlfito: "01a05ea9-54cd-70de-b4b6-d2394196d0e7",
    mVickyaRamadhan: "01a05ea9-54cd-76d5-bf61-013ad320f78f",
    herri: "01a05ea9-54cd-7f8c-965b-72b9714e84c9",
    dbaAaaK1: "01a05ea9-54cd-7725-9fba-2b4307c919fb",
    dbaBbbK1: "01a05ea9-54ce-7770-8a3f-f119f07fe751",
    devopsAaaK1: "01a05ea9-54ce-7a94-92e1-e0b346be3a3c",
    devopsBbbK1: "01a05ea9-54ce-7cc8-b50a-3913279a26d5",
    dbaAaaK2: "01a05ea9-54ce-7cba-8e38-67fcf8fe3c7f",
    dbaBbbK2: "01a05ea9-54ce-7f01-a9c3-e25dc5f50b95",
    devopsAaaK2: "01a05ea9-54ce-754f-9594-36fde9ccf6f0",
    devopsBbbK2: "01a05ea9-54ce-783c-9f03-0c08e18a5e1b",
    dbaAaaK3: "01a05ea9-54ce-7f28-8a2c-e58b14b06de0",
    dbaBbbK3: "01a05ea9-54ce-7242-a2a1-88653ff7cb35",
    devopsAaaK3: "01a05ea9-54ce-79c8-8134-9fbf80ed5564",
    devopsBbbK3: "01a05ea9-54ce-7ad4-a4fb-a2548221185d",
    atasanQonita: "01a05ea9-54ce-7038-91c1-c5e6744bd7a5",
    qonitaSupport: "01a05ea9-54ce-7143-8ed8-b341bd58f8fa",
    aaaSupport: "01a05ea9-54ce-7c7b-acd7-cfb29b88eb3e",
    bbbSupport: "01a05ea9-54cf-7b0f-bd63-69aa7fae9cca",
} as const;

// helper: "Hermawan Asmoko" -> "hermawan.asmoko@iconpln.co.id"
function toEmail(name: string): string {
    const clean = name
        .toLowerCase()
        .replace(/\./g, "") // remove periods (e.g. "M. Vickya" -> "m vickya")
        .replace(/[^a-z0-9\s]/g, "") // strip other non-alphanumeric chars
        .trim()
        .split(/\s+/)
        .join(".");
    return `${clean}@iconpln.co.id`;
}

const userNames: Record<keyof typeof userIds, string> = {
    hermawanAsmoko: "Hermawan Asmoko",
    fulanVpLain: "Fulan VP Lain",
    yoraYunita: "Yora Yunita",
    christlandPSimatupang: "Christland P. Simatupang",
    andrian: "Andrian",
    ariefK2: "Arief K2",
    fiqihAlfito: "Fiqih Alfito",
    mVickyaRamadhan: "M. Vickya Ramadhan",
    herri: "Herri",
    dbaAaaK1: "DBA AAA K1",
    dbaBbbK1: "DBA BBB K1",
    devopsAaaK1: "Devops AAA K1",
    devopsBbbK1: "Devops BBB K1",
    dbaAaaK2: "DBA AAA K2",
    dbaBbbK2: "DBA BBB K2",
    devopsAaaK2: "Devops AAA K2",
    devopsBbbK2: "Devops BBB K2",
    dbaAaaK3: "DBA AAA K3",
    dbaBbbK3: "DBA BBB K3",
    devopsAaaK3: "Devops AAA K3",
    devopsBbbK3: "Devops BBB K3",
    atasanQonita: "Atasan Qonita",
    qonitaSupport: "Qonita support",
    aaaSupport: "aaa support",
    bbbSupport: "bbb support",
};

const userData: typeof usersTable.$inferInsert[] = (
    Object.keys(userIds) as (keyof typeof userIds)[]
).map((key) => ({
    id: userIds[key],
    name: userNames[key],
    email: toEmail(userNames[key]),
    emailVerified: true,
}));

// =========================================================================
// ORGANIZATIONS
// =========================================================================
const organizationIds = {
    plnIconPlus: "01a05ea9-54cf-72bf-b77a-3fca49c14abf",
    plnPusat: "01a05ea9-54cf-7089-ad13-eadbdec4dff4",
    perusahaanExternal: "01a05ea9-54cf-7e97-865e-e9f26287c90c",
};

const organizationData: typeof organizationsTable.$inferInsert[] = [
    { organizationId: organizationIds.plnIconPlus, name: "PLN Icon Plus" },
    { organizationId: organizationIds.plnPusat, name: "PLN Pusat" },
    { organizationId: organizationIds.perusahaanExternal, name: "Perusahaan External" },
];

// =========================================================================
// DEPARTEMENTS
// =========================================================================
const departementIds = {
    digitalisasiPln2: "01a05ea9-54cf-7979-bb77-857b4bfe4aa4",
    operasiPln: "01a05ea9-54cf-7d24-be70-9c6874596536",
    outsourcingEtc: "01a05ea9-54cf-7f62-bb11-f21c06a748ad",
};

const departementData: typeof departementsTable.$inferInsert[] = [
    {
        departementId: departementIds.digitalisasiPln2,
        name: "Digitalisasi PLN 2",
        userId: userIds.hermawanAsmoko,
        organizationId: organizationIds.plnIconPlus,
    },
    {
        departementId: departementIds.operasiPln,
        name: "Operasi PLN",
        userId: userIds.fulanVpLain,
        organizationId: organizationIds.plnIconPlus,
    },
    {
        departementId: departementIds.outsourcingEtc,
        name: "Outsourcing etc",
        userId: userIds.hermawanAsmoko, // NOTE: no owner specified in requirement, defaulted — confirm if needed
        organizationId: organizationIds.perusahaanExternal,
    },
];

// =========================================================================
// SUB DEPARTMENTS
// =========================================================================
const subDepartmentIds = {
    aplikasiPlnKorporat1: "01a05ea9-54cf-7704-8ba1-e910d6b3e997",
    aplikasiPlnKorporat2: "01a05ea9-54cf-75fd-b097-c2b388ba7619",
    aplikasiPlnKorporat3: "01a05ea9-54cf-75aa-a6fc-f4b2cad8d4c2",
    plnOperasi: "01a05ea9-54cf-713c-84f8-14533f51b53a",
};

const subDepartmentData: typeof subDepartmentsTable.$inferInsert[] = [
    {
        subDepartmentId: subDepartmentIds.aplikasiPlnKorporat1,
        name: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 1",
        departementId: departementIds.digitalisasiPln2,
        userId: userIds.christlandPSimatupang,
    },
    {
        subDepartmentId: subDepartmentIds.aplikasiPlnKorporat2,
        name: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 2",
        departementId: departementIds.digitalisasiPln2,
        userId: userIds.ariefK2,
    },
    {
        subDepartmentId: subDepartmentIds.aplikasiPlnKorporat3,
        name: "Aplikasi PLN Korporat dan Pelayanan Pelanggan 3",
        departementId: departementIds.digitalisasiPln2,
        userId: userIds.andrian,
    },
    {
        subDepartmentId: subDepartmentIds.plnOperasi,
        name: "PLN Operasi",
        departementId: departementIds.operasiPln,
        userId: userIds.atasanQonita,
    },
];

// =========================================================================
// TEAMS
// =========================================================================
const teamIds = {
    seksiOperasional: "01a05ea9-54cf-7055-9c83-8f90f562cccf",
    seksiPengembangan: "01a05ea9-54cf-7e4e-8c6c-6e167e89854d",
    seksiSupportQonita: "01a05ea9-54cf-7180-8d19-3aa70c736667",
};

const teamData: typeof teamsTable.$inferInsert[] = [
    {
        teamId: teamIds.seksiOperasional,
        name: "Seksi Operasional",
        subDepartmentId: subDepartmentIds.aplikasiPlnKorporat1,
    },
    {
        teamId: teamIds.seksiPengembangan,
        name: "Seksi Pengembangan",
        subDepartmentId: subDepartmentIds.aplikasiPlnKorporat1,
    },
    {
        teamId: teamIds.seksiSupportQonita,
        name: "Seksi Support Qonita",
        subDepartmentId: subDepartmentIds.plnOperasi,
    },
];

// =========================================================================
// TEAM LEADERS
// =========================================================================
const teamLeaderData: typeof teamLeadersTable.$inferInsert[] = [
    {
        teamLeaderId: "01a05ea9-54cf-767a-96ed-7010d269eed1",
        userId: userIds.fiqihAlfito,
        teamId: teamIds.seksiOperasional,
    },
    {
        teamLeaderId: "01a05ea9-54cf-72c9-a21d-e8b5ebd776db",
        userId: userIds.mVickyaRamadhan,
        teamId: teamIds.seksiOperasional,
    },
    {
        teamLeaderId: "01a05ea9-54cf-7b36-9611-355f5633e1a1",
        userId: userIds.herri,
        teamId: teamIds.seksiOperasional,
    },
    {
        teamLeaderId: "01a05ea9-54cf-728b-8867-0c5f2f6a5169",
        userId: userIds.qonitaSupport,
        teamId: teamIds.seksiSupportQonita,
    },
];

// =========================================================================
// SUB TEAMS
// =========================================================================
const subTeamData: typeof subTeamsTable.$inferInsert[] = [
    {
        subTeamId: "01a05ea9-54cf-7e8e-97e3-ccf5ff405de9",
        name: "DBA",
        teamId: teamIds.seksiOperasional,
    },
    {
        subTeamId: "01a05ea9-54cf-77e5-9252-5cba3ac96748",
        name: "DEVOPS",
        teamId: teamIds.seksiOperasional,
    },
];

// =========================================================================
// SEED RUNNER
// =========================================================================
async function seed() {
    try {
        await truncateAll();
        console.log("Truncated all tables");

        await db.insert(usersTable).values(userData);
        console.log("✓ Users seeded");

        await db.insert(organizationsTable).values(organizationData);
        console.log("✓ Organizations seeded");

        await db.insert(departementsTable).values(departementData);
        console.log("✓ Departements seeded");

        await db.insert(subDepartmentsTable).values(subDepartmentData);
        console.log("✓ Sub departments seeded");

        await db.insert(teamsTable).values(teamData);
        console.log("✓ Teams seeded");

        await db.insert(teamLeadersTable).values(teamLeaderData);
        console.log("✓ Team leaders seeded");

        await db.insert(subTeamsTable).values(subTeamData);
        console.log("✓ Sub teams seeded");

        console.log("✓ Seed completed");
    } catch (err) {
        console.error("✗ Seed failed:", err);
        process.exit(1);
    }
}

await seed();