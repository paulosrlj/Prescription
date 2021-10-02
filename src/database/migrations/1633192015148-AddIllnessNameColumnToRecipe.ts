import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIllnessNameColumnToRecipe1633192015148
  implements MigrationInterface
{
  name = 'AddIllnessNameColumnToRecipe1633192015148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctor_crm" varchar, "due" boolean NOT NULL, "illness_name" varchar NOT NULL, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_37c7903735e737a03e622309da6" FOREIGN KEY ("doctor_crm") REFERENCES "doctors" ("crm") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctor_crm", "due") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctor_crm", "due" FROM "recipes"`,
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
      `CREATE TABLE "recipes" ("id" varchar PRIMARY KEY NOT NULL, "validade" date NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, "doctor_crm" varchar, "due" boolean NOT NULL, CONSTRAINT "FK_637e68a4d6c28853ae3ec3e9934" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_37c7903735e737a03e622309da6" FOREIGN KEY ("doctor_crm") REFERENCES "doctors" ("crm") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipes"("id", "validade", "created_at", "updated_at", "cardId", "doctor_crm", "due") SELECT "id", "validade", "created_at", "updated_at", "cardId", "doctor_crm", "due" FROM "temporary_recipes"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipes"`);
  }
}
