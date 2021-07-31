import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePatient1627518348708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'birthDate',
            type: 'Date',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: "date('now')",
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: "date('now')",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients');
  }
}
