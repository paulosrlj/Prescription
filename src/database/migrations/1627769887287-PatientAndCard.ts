import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientAndCard1627769887287 implements MigrationInterface {
  name = 'PatientAndCard1627769887287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" varchar NOT NULL, "cpf" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "birthDate" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "patientCpf" varchar, CONSTRAINT "REL_2068a7ae01ed967cf16525b9e7" UNIQUE ("patientCpf"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "patientCpf" varchar, CONSTRAINT "REL_2068a7ae01ed967cf16525b9e7" UNIQUE ("patientCpf"), CONSTRAINT "FK_2068a7ae01ed967cf16525b9e76" FOREIGN KEY ("patientCpf") REFERENCES "patients" ("cpf") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_cards"("id", "quantidade_receitas", "created_at", "updated_at", "patientCpf") SELECT "id", "quantidade_receitas", "created_at", "updated_at", "patientCpf" FROM "cards"`,
    );
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`ALTER TABLE "temporary_cards" RENAME TO "cards"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cards" RENAME TO "temporary_cards"`);
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" varchar PRIMARY KEY NOT NULL, "quantidade_receitas" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "patientCpf" varchar, CONSTRAINT "REL_2068a7ae01ed967cf16525b9e7" UNIQUE ("patientCpf"))`,
    );
    await queryRunner.query(
      `INSERT INTO "cards"("id", "quantidade_receitas", "created_at", "updated_at", "patientCpf") SELECT "id", "quantidade_receitas", "created_at", "updated_at", "patientCpf" FROM "temporary_cards"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_cards"`);
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
