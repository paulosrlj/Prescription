import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecipeHasMedicines1627772262679 implements MigrationInterface {
  name = 'RecipeHasMedicines1627772262679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medicines" ("id" varchar NOT NULL, "idRegister" varchar NOT NULL, "nome" varchar NOT NULL, "categoria" varchar NOT NULL, "classe_terapeutica" varchar NOT NULL, "empresa_detentora" varchar NOT NULL, PRIMARY KEY ("idRegister", "nome"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, "medicinesNome" varchar NOT NULL, PRIMARY KEY ("recipesId", "medicinesIdRegister", "medicinesNome"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd1a7f1670a335c301807122a2" ON "recipes_medicines_medicines" ("medicinesIdRegister", "medicinesNome") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
    await queryRunner.query(`DROP INDEX "IDX_bd1a7f1670a335c301807122a2"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, "medicinesNome" varchar NOT NULL, CONSTRAINT "FK_23f3d9496c0ec5fc28920d13478" FOREIGN KEY ("recipesId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bd1a7f1670a335c301807122a28" FOREIGN KEY ("medicinesIdRegister", "medicinesNome") REFERENCES "medicines" ("idRegister", "nome") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("recipesId", "medicinesIdRegister", "medicinesNome"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipes_medicines_medicines"("recipesId", "medicinesIdRegister", "medicinesNome") SELECT "recipesId", "medicinesIdRegister", "medicinesNome" FROM "recipes_medicines_medicines"`,
    );
    await queryRunner.query(`DROP TABLE "recipes_medicines_medicines"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipes_medicines_medicines" RENAME TO "recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd1a7f1670a335c301807122a2" ON "recipes_medicines_medicines" ("medicinesIdRegister", "medicinesNome") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_bd1a7f1670a335c301807122a2"`);
    await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
    await queryRunner.query(
      `ALTER TABLE "recipes_medicines_medicines" RENAME TO "temporary_recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes_medicines_medicines" ("recipesId" varchar NOT NULL, "medicinesIdRegister" varchar NOT NULL, "medicinesNome" varchar NOT NULL, PRIMARY KEY ("recipesId", "medicinesIdRegister", "medicinesNome"))`,
    );
    await queryRunner.query(
      `INSERT INTO "recipes_medicines_medicines"("recipesId", "medicinesIdRegister", "medicinesNome") SELECT "recipesId", "medicinesIdRegister", "medicinesNome" FROM "temporary_recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_recipes_medicines_medicines"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd1a7f1670a335c301807122a2" ON "recipes_medicines_medicines" ("medicinesIdRegister", "medicinesNome") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23f3d9496c0ec5fc28920d1347" ON "recipes_medicines_medicines" ("recipesId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_bd1a7f1670a335c301807122a2"`);
    await queryRunner.query(`DROP INDEX "IDX_23f3d9496c0ec5fc28920d1347"`);
    await queryRunner.query(`DROP TABLE "recipes_medicines_medicines"`);
    await queryRunner.query(`DROP TABLE "medicines"`);
  }
}
