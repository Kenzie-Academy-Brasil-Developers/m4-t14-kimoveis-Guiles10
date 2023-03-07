import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllTables1678113548116 implements MigrationInterface {
    name = 'createAllTables1678113548116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "realEstate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "size" integer NOT NULL, "value" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" date NOT NULL DEFAULT now(), "upedatedAt" date NOT NULL DEFAULT now(), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_8137b7f715382ad34dc87367d2" UNIQUE ("addressId"), CONSTRAINT "PK_3dda4b00f0afdfda35742b06969" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(8), "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" character varying NOT NULL, "userId" integer, "realEstateId" integer, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_8137b7f715382ad34dc87367d21" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_ac3131bb922483053abebc5e9ff" FOREIGN KEY ("realEstateId") REFERENCES "realEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_ac3131bb922483053abebc5e9ff"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_8137b7f715382ad34dc87367d21"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "realEstate"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
