import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorRecipes1627771328279 implements MigrationInterface {
  name = 'DoctorRecipes1627771328279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctorCrm" varchar, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipes"("id", "validade", "created_at", "updated_at", "cardId") SELECT "id", "validade", "created_at", "updated_at", "cardId" FROM "recipes"`,
    );
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipes" RENAME TO "recipes"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctorCrm" varchar, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_59a13450790f76b56f93848a6a4" FOREIGN KEY ("doctorCrm") REFERENCES "doctors" ("crm") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctorCrm") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctorCrm" FROM "recipes"`,
    );
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipes" RENAME TO "recipes"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" RENAME TO "temporary_recipes"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctorCrm" varchar, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctorCrm") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctorCrm" FROM "temporary_recipes"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipes"`);
    await queryRunner.query(
      `ALTER TABLE "recipes" RENAME TO "temporary_recipes"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipes"("id", "validade", "created_at", "updated_at", "cardId") SELECT "id", "validade", "created_at", "updated_at", "cardId" FROM "temporary_recipes"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipes"`);
  }
}
