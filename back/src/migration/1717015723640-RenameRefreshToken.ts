import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRefreshToken1717015723640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_token\` RENAME TO \`refresh_tokens\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` RENAME TO \`refresh_token\`;`);
    }

}
