import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesAndRelations1628295708229 implements MigrationInterface {
    name = 'EntitiesAndRelations1628295708229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" varchar NOT NULL, "crm" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "medicines" ("id" varchar NOT NULL, "idRegister" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "categoria" varchar NOT NULL, "classe_terapeutica" varchar NOT NULL, "empresa_detentora" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctorCrm" varchar)`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, PRIMARY KEY ("recipesId", "medicinesIdRegister"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_96ea49beead2686c9c34888ce5" ON "recipes_medicines_medicines" ("medicinesIdRegister") `);
        await queryRunner.query(`CREATE TABLE "temporary_patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"), CONSTRAINT "FK_188cfb793e0c280e5f5617967e6" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId" FROM "patients"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`ALTER TABLE "temporary_patients" RENAME TO "patients"`);
        await queryRunner.query(`CREATE TABLE "temporary_recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctorCrm" varchar, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_59a13450790f76b56f93848a6a4" FOREIGN KEY ("doctorCrm") REFERENCES "doctors" ("crm") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctorCrm") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctorCrm" FROM "recipes"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`ALTER TABLE "temporary_recipes" RENAME TO "recipes"`);
        await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
        await queryRunner.query(`DROP INDEX "IDX_96ea49beead2686c9c34888ce5"`);
        await queryRunner.query(`CREATE TABLE "temporary_recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, CONSTRAINT "FK_23f3d9496c0ec5fc28920d13478" FOREIGN KEY ("recipesId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_96ea49beead2686c9c34888ce51" FOREIGN KEY ("medicinesIdRegister") REFERENCES "medicines" ("idRegister") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("recipesId", "medicinesIdRegister"))`);
        await queryRunner.query(`INSERT INTO "temporary_recipes_medicines_medicines"("recipesId", "medicinesIdRegister") SELECT "recipesId", "medicinesIdRegister" FROM "recipes_medicines_medicines"`);
        await queryRunner.query(`DROP TABLE "recipes_medicines_medicines"`);
        await queryRunner.query(`ALTER TABLE "temporary_recipes_medicines_medicines" RENAME TO "recipes_medicines_medicines"`);
        await queryRunner.query(`CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_96ea49beead2686c9c34888ce5" ON "recipes_medicines_medicines" ("medicinesIdRegister") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_96ea49beead2686c9c34888ce5"`);
        await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
        await queryRunner.query(`ALTER TABLE "recipes_medicines_medicines" RENAME TO "temporary_recipes_medicines_medicines"`);
        await queryRunner.query(`CREATE TABLE "recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, PRIMARY KEY ("recipesId", "medicinesIdRegister"))`);
        await queryRunner.query(`INSERT INTO "recipes_medicines_medicines"("recipesId", "medicinesIdRegister") SELECT "recipesId", "medicinesIdRegister" FROM "temporary_recipes_medicines_medicines"`);
        await queryRunner.query(`DROP TABLE "temporary_recipes_medicines_medicines"`);
        await queryRunner.query(`CREATE INDEX "IDX_96ea49beead2686c9c34888ce5" ON "recipes_medicines_medicines" ("medicinesIdRegister") `);
        await queryRunner.query(`CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `);
        await queryRunner.query(`ALTER TABLE "recipes" RENAME TO "temporary_recipes"`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctorCrm" varchar)`);
        await queryRunner.query(`INSERT INTO "recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctorCrm") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctorCrm" FROM "temporary_recipes"`);
        await queryRunner.query(`DROP TABLE "temporary_recipes"`);
        await queryRunner.query(`ALTER TABLE "patients" RENAME TO "temporary_patients"`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"))`);
        await queryRunner.query(`INSERT INTO "patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId" FROM "temporary_patients"`);
        await queryRunner.query(`DROP TABLE "temporary_patients"`);
        await queryRunner.query(`DROP INDEX "IDX_96ea49beead2686c9c34888ce5"`);
        await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
        await queryRunner.query(`DROP TABLE "recipes_medicines_medicines"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "medicines"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
