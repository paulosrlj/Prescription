import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DosagemColumn1633203010189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recipe_medicine',
      new TableColumn({ name: 'dosagem', type: 'varchar', isNullable: false }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recipe_medicine', 'dosagem');
  }
}
