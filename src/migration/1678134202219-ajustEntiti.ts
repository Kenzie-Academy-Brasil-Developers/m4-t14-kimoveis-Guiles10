import { MigrationInterface, QueryRunner } from "typeorm";

export class ajustEntiti1678134202219 implements MigrationInterface {
    name = 'ajustEntiti1678134202219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstate" RENAME COLUMN "upedatedAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstate" RENAME COLUMN "updatedAt" TO "upedatedAt"`);
    }

}
