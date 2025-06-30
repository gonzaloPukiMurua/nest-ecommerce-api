import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751253177179 implements MigrationInterface {
    name = 'InitSchema1751253177179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."adresses_address_type_enum" AS ENUM('billing', 'shipping', 'fiscal')`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "province" character varying NOT NULL, "postalCode" character varying NOT NULL, "country" character varying NOT NULL, "isPrimary" boolean NOT NULL DEFAULT false, "address_type" "public"."adresses_address_type_enum" NOT NULL DEFAULT 'billing', CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "document_number" character varying, "tax_status" character varying, "email" character varying, "phone" character varying, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" integer, CONSTRAINT "REL_67c4d10f39fdc8a0bbfccdcf73" UNIQUE ("addressId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contact_name" character varying, "contact_email" character varying, "contact_phone" character varying, "tax_id" character varying, "discount_rate" numeric, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" integer, CONSTRAINT "REL_39ff171699133c953b3813bb62" UNIQUE ("addressId"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "supplierId" integer`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "quantity" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_39ff171699133c953b3813bb62a" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_39ff171699133c953b3813bb62a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a"`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "quantity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "supplierId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`DROP TYPE "public"."adresses_address_type_enum"`);
    }

}
