// tslint:disable:max-line-length

import { MigrationInterface, QueryRunner } from 'typeorm';

export interface IFulltextSearchConf {
  tableName: string;
  vectorName: string;
  searchFields: string[];
}

export abstract class AFulltextSearch implements MigrationInterface {
  protected opts: IFulltextSearchConf;

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      CREATE OR REPLACE FUNCTION vn_unaccent(text)
      RETURNS text AS
      $func$
      SELECT
        CASE
          WHEN $1 IS NULL THEN ''
          ELSE lower(translate($1,
            '¹²³ÀÁẢẠÂẤẦẨẬẪÃÄÅÆàáảạâấầẩẫậãäåæĀāĂẮẰẲẴẶăắằẳẵặĄąÇçĆćĈĉĊċČčĎďĐđÈÉẸÊẾỀỄỆËèéẹêềếễệëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨÌÍỈỊÎÏìíỉịîïĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓỎỌÔỐỒỔỖỘỐỒỔỖỘƠỚỜỞỠỢÕÖòóỏọôốồổỗộơớờỡợởõöŌōŎŏŐőŒœØøŔŕŖŗŘřßŚśŜŝŞşŠšŢţŤťŦŧÙÚỦỤƯỪỨỬỮỰÛÜùúủụûưứừửữựüŨũŪūŬŭŮůŰűŲųŴŵÝýỳÿŶŷŸŹźŻżŽžёЁ',
            '123AAAAAAAAAAAAAAaaaaaaaaaaaaaaAaAAAAAAaaaaaaAaCcCcCcCcCcDdDdEEEEEEEEEeeeeeeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIIIIiiiiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooOoOoOoEeOoRrRrRrSSsSsSsSsTtTtTtUUUUUUUUUUUUuuuuuuuuuuuuUuUuUuUuUuUuWwYyyyYyYZzZzZzеЕ'))
        END;
      $func$ LANGUAGE sql IMMUTABLE;
      `,
    );

    await queryRunner.query(
      `ALTER TABLE "${this.opts.tableName}" DROP COLUMN IF EXISTS "${this.opts.vectorName}";`,
    );
    await queryRunner.query(
      `ALTER TABLE "${this.opts.tableName}" ADD COLUMN "${this.opts.vectorName}" TSVECTOR;`,
    );

    await queryRunner.query(
      `UPDATE "${this.opts.tableName}"
      SET "${
        this.opts.vectorName
      }" = to_tsvector('pg_catalog.simple', ${this.opts.searchFields
        .map(f => `vn_unaccent(${f})`)
        .join(" || ' ' || ")})`,
    );

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION ${
        this.opts.tableName
      }_update_tsv_trigger() RETURNS trigger AS $$
      begin
        new.${
          this.opts.vectorName
        } := to_tsvector('pg_catalog.simple', ${this.opts.searchFields
      .map(f => `vn_unaccent(new.${f})`)
      .join(" || ' ' || ")});
        return new;
      end
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(
      `DROP TRIGGER IF EXISTS ${this.opts.tableName}_search_vector_update ON "${this.opts.tableName}";`,
    );

    await queryRunner.query(
      `CREATE TRIGGER ${this.opts.tableName}_search_vector_update
      BEFORE INSERT OR UPDATE ON "${this.opts.tableName}"
      FOR EACH ROW EXECUTE PROCEDURE ${this.opts.tableName}_update_tsv_trigger();`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS ${this.opts.tableName}_search_vector_update ON ${this.opts.tableName};`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS ${this.opts.tableName}_update_tsv_trigger();`,
    );
  }
}
