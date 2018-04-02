import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserMailUnique1522665912465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD CONSTRAINT "uk_user_entity_mail" UNIQUE ("mail")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user_entity" ADD CONSTRAINT "uk_user_entity_mail" UNIQUE ("mail")`);
    }

}
