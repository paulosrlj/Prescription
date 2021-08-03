import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeCardForeignKey1628032280590 implements MigrationInterface {
  name = 'ChangeCardForeignKey1628032280590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "patientCpf" varchar, CONSTRAINT "REL_2068a7ae01ed967cf16525b9e7" UNIQUE ("patientCpf"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_cards"("id", "quantidade_receitas", "created_at", "updated_at", "patientCpf") SELECT "id", "quantidade_receitas", "created_at", "updated_at", "patientCpf" FROM "cards"`,
    );
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`ALTER TABLE "temporary_cards" RENAME TO "cards"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_cards"("id", "quantidade_receitas", "created_at", "updated_at") SELECT "id", "quantidade_receitas", "created_at", "updated_at" FROM "cards"`,
    );
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`ALTER TABLE "temporary_cards" RENAME TO "cards"`);
    await queryRunner.query(`DROP INDEX "IDX_bd1a7f1670a335c301807122a2"`);
    await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, "medicinesNome" varchar NOT NULL, CONSTRAINT "FK_bd1a7f1670a335c301807122a28" FOREIGN KEY ("medicinesIdRegister", "medicinesNome") REFERENCES "medicines" ("idRegister", "nome") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_23f3d9496c0ec5fc28920d13478" FOREIGN KEY ("recipesId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("recipesId", "medicinesIdRegister", "medicinesNome"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipes_medicines_medicines"("recipesId", "medicinesIdRegister", "medicinesNome") SELECT "recipesId", "medicinesIdRegister", "medicinesNome" FROM "recipes_medicines_medicines"`,
    );
    await queryRunner.query(`DROP TABLE "recipes_medicines_medicines"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipes_medicines_medicines" RENAME TO "recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd1a7f1670a335c301807122a2" ON "recipes_medicines_medicines" ("medicinesIdRegister", "medicinesNome") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_fda97aaff50aa2211591ca38634" UNIQUE ("cardId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at" FROM "patients"`,
    );
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_patients" RENAME TO "patients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_medicines" ("id" varchar NOT NULL, "idRegister" varchar NOT NULL, "nome" varchar NOT NULL, "categoria" varchar NOT NULL, "classe_terapeutica" varchar NOT NULL, "empresa_detentora" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), PRIMARY KEY ("idRegister", "nome"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_medicines"("id", "idRegister", "nome", "categoria", "classe_terapeutica", "empresa_detentora") SELECT "id", "idRegister", "nome", "categoria", "classe_terapeutica", "empresa_detentora" FROM "medicines"`,
    );
    await queryRunner.query(`DROP TABLE "medicines"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_medicines" RENAME TO "medicines"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_fda97aaff50aa2211591ca38634" UNIQUE ("cardId"), CONSTRAINT "FK_188cfb793e0c280e5f5617967e6" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId" FROM "patients"`,
    );
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_patients" RENAME TO "patients"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" RENAME TO "temporary_patients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_fda97aaff50aa2211591ca38634" UNIQUE ("cardId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId" FROM "temporary_patients"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_patients"`);
    await queryRunner.query(
      `ALTER TABLE "medicines" RENAME TO "temporary_medicines"`,
    );
    await queryRunner.query(
      `CREATE TABLE "medicines" ("id" varchar NOT NULL, "idRegister" varchar NOT NULL, "nome" varchar NOT NULL, "categoria" varchar NOT NULL, "classe_terapeutica" varchar NOT NULL, "empresa_detentora" varchar NOT NULL, PRIMARY KEY ("idRegister", "nome"))`,
    );
    await queryRunner.query(
      `INSERT INTO "medicines"("id", "idRegister", "nome", "categoria", "classe_terapeutica", "empresa_detentora") SELECT "id", "idRegister", "nome", "categoria", "classe_terapeutica", "empresa_detentora" FROM "temporary_medicines"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_medicines"`);
    await queryRunner.query(
      `ALTER TABLE "patients" RENAME TO "temporary_patients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at" FROM "temporary_patients"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_patients"`);
    await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
    await queryRunner.query(`DROP INDEX "IDX_bd1a7f1670a335c301807122a2"`);
    await queryRunner.query(
      `ALTER TABLE "recipes_medicines_medicines" RENAME TO "temporary_recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, "medicinesNome" varchar NOT NULL, "dosagem" varchar NOT NULL, CONSTRAINT "FK_bd1a7f1670a335c301807122a28" FOREIGN KEY ("medicinesIdRegister", "medicinesNome") REFERENCES "medicines" ("idRegister", "nome") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_23f3d9496c0ec5fc28920d13478" FOREIGN KEY ("recipesId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("recipesId", "medicinesIdRegister", "medicinesNome"))`,
    );
    await queryRunner.query(
      `INSERT INTO "recipes_medicines_medicines"("recipesId", "medicinesIdRegister", "medicinesNome") SELECT "recipesId", "medicinesIdRegister", "medicinesNome" FROM "temporary_recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd1a7f1670a335c301807122a2" ON "recipes_medicines_medicines" ("medicinesIdRegister", "medicinesNome") `,
    );
    await queryRunner.query(`ALTER TABLE "cards" RENAME TO "temporary_cards"`);
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "patientCpf" varchar, CONSTRAINT "REL_2068a7ae01ed967cf16525b9e7" UNIQUE ("patientCpf"))`,
    );
    await queryRunner.query(
      `INSERT INTO "cards"("id", "quantidade_receitas", "created_at", "updated_at") SELECT "id", "quantidade_receitas", "created_at", "updated_at" FROM "temporary_cards"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_cards"`);
    await queryRunner.query(`ALTER TABLE "cards" RENAME TO "temporary_cards"`);
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "patientCpf" varchar, CONSTRAINT "REL_2068a7ae01ed967cf16525b9e7" UNIQUE ("patientCpf"), CONSTRAINT "FK_2068a7ae01ed967cf16525b9e76" FOREIGN KEY ("patientCpf") REFERENCES "patients" ("cpf") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "cards"("id", "quantidade_receitas", "created_at", "updated_at", "patientCpf") SELECT "id", "quantidade_receitas", "created_at", "updated_at", "patientCpf" FROM "temporary_cards"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_cards"`);
  }
}
