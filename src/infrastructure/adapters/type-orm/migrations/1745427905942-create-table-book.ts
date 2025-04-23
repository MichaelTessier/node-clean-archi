import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBook1745427905942 implements MigrationInterface {
    name = 'CreateTableBook1745427905942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "summary" character varying NOT NULL, "author" character varying NOT NULL, "total_pages" integer NOT NULL, "created_at" TIME NOT NULL DEFAULT now(), CONSTRAINT "PK_3ea5638ccafa8799838e68fad46" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book_entity"`);
    }

}
