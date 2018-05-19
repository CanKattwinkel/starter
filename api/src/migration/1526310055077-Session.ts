import {MigrationInterface, QueryRunner} from "typeorm";

export class Session1526310055077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" SERIAL NOT NULL, "token" character varying, "lastUsed" TIMESTAMP NOT NULL, "lastBrowser" character varying NOT NULL, "lastOs" character varying NOT NULL, "lastIp" cidr NOT NULL, "userId" integer, CONSTRAINT "uk_session_entity_token" UNIQUE ("token"), PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "session_entity" ADD CONSTRAINT "fk_1b1658c5a4d0788714ffd2b16e6" FOREIGN KEY ("userId") REFERENCES "user_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "session_entity" DROP CONSTRAINT "fk_1b1658c5a4d0788714ffd2b16e6"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
    }

}
