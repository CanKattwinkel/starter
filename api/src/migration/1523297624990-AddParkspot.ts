import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddParkspot1523297624990 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "park_spot_entity" ("id" SERIAL NOT NULL, "available" boolean NOT NULL, "electricCharger" boolean NOT NULL, PRIMARY KEY("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "park_spot_entity"`);
  }

}
