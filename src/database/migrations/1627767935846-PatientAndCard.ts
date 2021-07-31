import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientAndCard1627767935846 implements MigrationInterface {
  name = 'PatientAndCard1627767935846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"), CONSTRAINT "FK_188cfb793e0c280e5f5617967e6" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
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
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cardId" varchar, CONSTRAINT "REL_188cfb793e0c280e5f5617967e" UNIQUE ("cardId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "patients"("id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId") SELECT "id", "cpf", "email", "name", "password", "phone", "birthDate", "created_at", "updated_at", "cardId" FROM "temporary_patients"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_patients"`);
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
