import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateImagesAndRelations1628805269474 implements MigrationInterface {
    name = 'CreateImagesAndRelations1628805269474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipeId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipeId" varchar, CONSTRAINT "FK_4f43c43cadc0bbaae9e81831f38" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "name", "path", "created_at", "updated_at", "recipeId") SELECT "id", "name", "path", "created_at", "updated_at", "recipeId" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "recipeId" varchar)`);
        await queryRunner.query(`INSERT INTO "image"("id", "name", "path", "created_at", "updated_at", "recipeId") SELECT "id", "name", "path", "created_at", "updated_at", "recipeId" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
