import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RecipeMedicinePrimaryKey1633203789490
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recipe_medicine',
      new TableColumn({
        name: 'id',
        type: 'serial',
        isNullable: false,
        isPrimary: true,
      }),
    );

    await queryRunner.changeColumn(
      'recipe_medicine',
      'recipe_id',
      new TableColumn({
        name: 'recipeId',
        type: 'varchar',
      }),
    );

    await queryRunner.changeColumn(
      'recipe_medicine',
      'medicine_idRegister',
      new TableColumn({
        name: 'medicineIdRegister',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recipe_medicine', 'id');
    await queryRunner.dropColumn('recipe_medicine', 'recipeId');
    await queryRunner.dropColumn('recipe_medicine', 'medicineIdRegister');
  }
}
