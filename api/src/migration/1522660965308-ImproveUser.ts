import {MigrationInterface, QueryRunner} from 'typeorm';

export class ImproveUser1522660965308 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "password" character varying(60) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "userLevel" integer NOT NULL DEFAULT 1`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP "userLevel"`);
    await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP "password"`);
  }

}
