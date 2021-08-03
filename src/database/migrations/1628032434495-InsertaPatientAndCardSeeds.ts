import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertaPatientAndCardSeeds1628032434495
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO cards(id, quantidade_receitas, created_at, updated_at)
      VALUES ("6ea451b2-fb78-440f-b61e-d42ab7b80a26", 0, DATETIME('now'), DATETIME('now'))`,
    );
    await queryRunner.query(
      `INSERT INTO cards(id, quantidade_receitas, created_at, updated_at)
      VALUES ("57f18ca8-01d0-4808-b934-3de5f4a52bcb", 2, DATETIME('now'), DATETIME('now'))`,
    );

    await queryRunner.query(
      `INSERT INTO patients(id, cpf, email, name, password, phone, birthDate, created_at, updated_at, cardId)
      VALUES ("ece90371-5de7-4cc6-89be-f3b6215df967", "50000000076", "paulo@test.com",
      "Paulo Calamidade", "123456", "99999999", "30/05/2001", DATETIME('now'), DATETIME('now'), "6ea451b2-fb78-440f-b61e-d42ab7b80a26")`,
    );
    await queryRunner.query(
      `INSERT INTO patients(id, cpf, email, name, password, phone, birthDate, created_at, updated_at, cardId)
      VALUES ("08b053e2-5b42-4b01-941b-fdd1741e0225", "99999999976", "chrisi@test.com",
      "Chrisi Tiro Certo", "123456", "99999999", "02/03/1990", DATETIME('now'), DATETIME('now'), "57f18ca8-01d0-4808-b934-3de5f4a52bcb")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM patients WHERE id = "ece90371-5de7-4cc6-89be-f3b6215df967"',
    );
    await queryRunner.query(
      'DELETE FROM patients WHERE id = "08b053e2-5b42-4b01-941b-fdd1741e0225"',
    );
    await queryRunner.query(
      'DELETE FROM cards WHERE id = "6ea451b2-fb78-440f-b61e-d42ab7b80a26"',
    );
    await queryRunner.query(
      'DELETE FROM cards WHERE id = "57f18ca8-01d0-4808-b934-3de5f4a52bcb"',
    );
  }
}
