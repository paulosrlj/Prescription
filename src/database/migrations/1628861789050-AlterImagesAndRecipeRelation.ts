import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterImagesAndRecipeRelation1628861789050 implements MigrationInterface {
    name = 'AlterImagesAndRecipeRelation1628861789050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipe_id" varchar, CONSTRAINT "FK_ded6dbd46f1d4e30c69d50016a6" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "name", "path", "created_at", "updated_at", "recipe_id") SELECT "id", "name", "path", "created_at", "updated_at", "recipe_id" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipe_id" varchar, CONSTRAINT "FK_ded6dbd46f1d4e30c69d50016a6" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "name", "path", "created_at", "updated_at", "recipe_id") SELECT "id", "name", "path", "created_at", "updated_at", "recipe_id" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipe_id" varchar, CONSTRAINT "FK_ded6dbd46f1d4e30c69d50016a6" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "image"("id", "name", "path", "created_at", "updated_at", "recipe_id") SELECT "id", "name", "path", "created_at", "updated_at", "recipe_id" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipe_id" varchar, CONSTRAINT "FK_ded6dbd46f1d4e30c69d50016a6" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "image"("id", "name", "path", "created_at", "updated_at", "recipe_id") SELECT "id", "name", "path", "created_at", "updated_at", "recipe_id" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
    }

}
