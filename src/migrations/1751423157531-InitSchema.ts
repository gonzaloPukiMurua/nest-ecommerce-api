import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751423157531 implements MigrationInterface {
    name = 'InitSchema1751423157531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "general_discount" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "general_surcharge" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "is_draft" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "discount" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "is_draft"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "general_surcharge"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "general_discount"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "active"`);
    }

}
