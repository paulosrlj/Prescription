import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeeds1628541933284 implements MigrationInterface {
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
      `INSERT INTO patients(id, cpf, email, name, password, phone, birth_date, created_at, updated_at, cardId)
      VALUES ("ece90371-5de7-4cc6-89be-f3b6215df967", "50000000076", "paulo@test.com",
      "Paulo Calamidade", "123456", "99999999", "DATE('30/05/2001')", DATETIME('now'), DATETIME('now'), "6ea451b2-fb78-440f-b61e-d42ab7b80a26")`,
    );
    await queryRunner.query(
      `INSERT INTO patients(id, cpf, email, name, password, phone, birth_date, created_at, updated_at, cardId)
      VALUES ("08b053e2-5b42-4b01-941b-fdd1741e0225", "99999999976", "chrisi@test.com",
      "Chrisi Tiro Certo", "123456", "99999999", "DATE('02/03/1990')", DATETIME('now'), DATETIME('now'), "57f18ca8-01d0-4808-b934-3de5f4a52bcb")`,
    );

    await queryRunner.query(
      `INSERT INTO medicines(id, idRegister, nome, categoria, classe_terapeutica, empresa_detentora, dosagem)
      VALUES ("4b5b8189-0137-4e66-b285-7737a2841704", "102030", "Dipirona",
      "Remédio", "Analgésico", "Farmaco LTDA", "1ml a cada 2 horas")`,
    );

    await queryRunner.query(
      `INSERT INTO medicines(id, idRegister, nome, categoria, classe_terapeutica, empresa_detentora, dosagem)
      VALUES ("d0bee775-873b-43fe-a45f-8a9df6f0d5f9", "908070", "Leuvofloxacino",
      "Remédio", "Antialérgico", "Farmaco LTDA", "1 comprimido por dia")`,
    );

    await queryRunner.query(
      `INSERT INTO doctors(id, crm, email, name, password, phone, birth_date, created_at, updated_at)
      VALUES ("8b4fe337-69a2-4a27-9c37-20665f7730f2", "90257981272", "bruce@test.com",
      "Bruce Wayne", "102030", "99999999", "DATE('12/05/1985')", DATETIME('now'), DATETIME('now'))`,
    );

    await queryRunner.query(
      `INSERT INTO recipes(id, validade, created_at, updated_at, cardId, doctor_crm)
      VALUES ("1f416741-5fa2-43c3-9a3e-f20074913df1", "DATE('02/08/2025')", DATETIME('now'), DATETIME('now'),
      "6ea451b2-fb78-440f-b61e-d42ab7b80a26", "90257981272")`,
    );

    await queryRunner.query(
      `INSERT INTO recipe_medicine(recipe_id, medicine_idRegister)
      VALUES ("1f416741-5fa2-43c3-9a3e-f20074913df1", "102030")`,
    );

    await queryRunner.query(
      `INSERT INTO recipe_medicine(recipe_id, medicine_idRegister)
      VALUES ("1f416741-5fa2-43c3-9a3e-f20074913df1", "908070")`,
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
    await queryRunner.query(
      'DELETE FROM medicines WHERE idRegister = "102030"',
    );
    await queryRunner.query(
      'DELETE FROM medicines WHERE idRegister = "908070"',
    );
    await queryRunner.query('DELETE FROM doctors WHERE crm = "90257981272"');
    await queryRunner.query(
      'DELETE FROM recipes WHERE id = "1f416741-5fa2-43c3-9a3e-f20074913df1"',
    );

    await queryRunner.query(
      'DELETE FROM recipe_medicine WHERE recipe_id = "1f416741-5fa2-43c3-9a3e-f20074913df1"',
    );
  }
}
