import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationPropertys1627775681870
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE recipes_medicines_medicines ADD dosagem VARCHAR NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE recipes_medicines_medicines DROP COLUMN dosagem',
    );
  }
}
