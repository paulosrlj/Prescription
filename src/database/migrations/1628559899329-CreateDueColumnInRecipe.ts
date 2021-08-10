import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDueColumnInRecipe1628559899329
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE recipes ADD due BOOLEAN NOT NULL DEFAULT false',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE recipes DROP COLUMN due');
  }
}
