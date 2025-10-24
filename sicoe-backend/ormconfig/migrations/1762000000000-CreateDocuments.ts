import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDocuments1762000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Se precisar de uuid gerado no DB, habilite uma das extensões e mude o default:
    // await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await queryRunner.createTable(new Table({
      name: 'documents',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
        { name: 'name', type: 'varchar', length: '180', isNullable: false, isUnique: true },
        { name: 'createdAt', type: 'timestamptz', default: 'now()', isNullable: false },
        { name: 'updatedAt', type: 'timestamptz', default: 'now()', isNullable: false },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('documents');
  }
}
