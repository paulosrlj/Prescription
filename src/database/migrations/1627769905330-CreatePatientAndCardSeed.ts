import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientAndCardSeed1627769905330
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO patients(id, cpf, email, name, password, phone, birthDate, created_at, updated_at)
      VALUES ("ece90371-5de7-4cc6-89be-f3b6215df967", "50000000076", "paulo@test.com",
      "Paulo Calamidade", "123456", "99999999", "30/05/2001", DATETIME('now'), DATETIME('now'))`,
    );
    await queryRunner.query(
      `INSERT INTO cards(id, quantidade_receitas, created_at, updated_at, patientCpf)
      VALUES ("6ea451b2-fb78-440f-b61e-d42ab7b80a26", 0, DATETIME('now'), DATETIME('now'), "50000000076")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM cards WHERE id = "6ea451b2-fb78-440f-b61e-d42ab7b80a26"',
    );
    await queryRunner.query(
      'DELETE FROM patients WHERE id = "ece90371-5de7-4cc6-89be-f3b6215df967"',
    );
  }
}
