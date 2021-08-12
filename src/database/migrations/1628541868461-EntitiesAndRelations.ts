import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesAndRelations1628541868461 implements MigrationInterface {
  name = 'EntitiesAndRelations1628541868461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birth_date" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors" ("id" varchar NOT NULL, "crm" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birth_date" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medicines" ("id" varchar NOT NULL, "idRegister" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "categoria" varchar NOT NULL, "classe_terapeutica" varchar NOT NULL, "empresa_detentora" varchar NOT NULL, "dosagem" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctor_crm" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_medicine" ("recipe_id" varchar NOT NULL, "medicine_idRegister" varchar NOT NULL, PRIMARY KEY ("recipe_id", "medicine_idRegister"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_195b433a9079fac355b6849503" ON "recipe_medicine" ("recipe_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72ccbabaf78a9c075b55b9efc9" ON "recipe_medicine" ("medicine_idRegister") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birth_date" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"), CONSTRAINT "FK_188cfb793e0c280e5f5617967e6" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_patients"("id", "cpf", "email", "name", "password", "phone", "birth_date", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birth_date", "created_at", "updated_at", "cardId" FROM "patients"`,
    );
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_patients" RENAME TO "patients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctor_crm" varchar, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_59a13450790f76b56f93848a6a4" FOREIGN KEY ("doctor_crm") REFERENCES "doctors" ("crm") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctor_crm") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctor_crm" FROM "recipes"`,
    );
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipes" RENAME TO "recipes"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_195b433a9079fac355b6849503"`);
    await queryRunner.query(`DROP INDEX "IDX_72ccbabaf78a9c075b55b9efc9"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_recipe_medicine" ("recipe_id" varchar NOT NULL, "medicine_idRegister" varchar NOT NULL, CONSTRAINT "FK_195b433a9079fac355b68495036" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_72ccbabaf78a9c075b55b9efc99" FOREIGN KEY ("medicine_idRegister") REFERENCES "medicines" ("idRegister") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("recipe_id", "medicine_idRegister"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipe_medicine"("recipe_id", "medicine_idRegister") SELECT "recipe_id", "medicine_idRegister" FROM "recipe_medicine"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_medicine"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipe_medicine" RENAME TO "recipe_medicine"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_195b433a9079fac355b6849503" ON "recipe_medicine" ("recipe_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72ccbabaf78a9c075b55b9efc9" ON "recipe_medicine" ("medicine_idRegister") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_72ccbabaf78a9c075b55b9efc9"`);
    await queryRunner.query(`DROP INDEX "IDX_195b433a9079fac355b6849503"`);
    await queryRunner.query(
      `ALTER TABLE "recipe_medicine" RENAME TO "temporary_recipe_medicine"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_medicine" ("recipe_id" varchar NOT NULL, "medicine_idRegister" varchar NOT NULL, PRIMARY KEY ("recipe_id", "medicine_idRegister"))`,
    );
    await queryRunner.query(
      `INSERT INTO "recipe_medicine"("recipe_id", "medicine_idRegister") SELECT "recipe_id", "medicine_idRegister" FROM "temporary_recipe_medicine"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipe_medicine"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_72ccbabaf78a9c075b55b9efc9" ON "recipe_medicine" ("medicine_idRegister") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_195b433a9079fac355b6849503" ON "recipe_medicine" ("recipe_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" RENAME TO "temporary_recipes"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctor_crm" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctor_crm") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctor_crm" FROM "temporary_recipes"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipes"`);
    await queryRunner.query(
      `ALTER TABLE "patients" RENAME TO "temporary_patients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birth_date" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "patients"("id", "cpf", "email", "name", "password", "phone", "birth_date", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birth_date", "created_at", "updated_at", "cardId" FROM "temporary_patients"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_patients"`);
    await queryRunner.query(`DROP INDEX "IDX_72ccbabaf78a9c075b55b9efc9"`);
    await queryRunner.query(`DROP INDEX "IDX_195b433a9079fac355b6849503"`);
    await queryRunner.query(`DROP TABLE "recipe_medicine"`);
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(`DROP TABLE "medicines"`);
    await queryRunner.query(`DROP TABLE "doctors"`);
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
