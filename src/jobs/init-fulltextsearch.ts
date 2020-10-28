// tslint:disable:no-console
import * as options from '../ormconfig';
import { createConnection } from 'typeorm';

import { AFulltextSearch } from '../shared/classes/fulltextsearch.migration.class';

async function dbConnect() {
  return createConnection(options);
}

class FulltextSearch extends AFulltextSearch {
  constructor(option) {
    super();
    this.opts = option;
  }
}

const tables = [
  {
    searchFields: ['name'],
    tableName: 'hotel',
    vectorName: 'name_tsv',
  },
];

export default async function() {
  try {
    const job = process.argv[3];
    console.log(
      `Start init full text search: `,
      job === 'down' ? 'Down' : 'Up',
    );
    const conn = await dbConnect();
    await conn.synchronize(false);
    const queryRunner = conn.createQueryRunner();
    if (job === 'down') {
      await down(queryRunner);
    } else {
      await up(queryRunner);
    }
    await conn.close();
  } catch (error) {
    console.error(error);
  }
}

async function up(queryRunner) {
  console.log(`Start up`);
  for (const table of tables) {
    const fts = new FulltextSearch(table);
    await fts.up(queryRunner);
    console.log(`FulltextSearch ${table.tableName}.`);
  }
  console.log(`Up done!`);
}

async function down(queryRunner) {
  console.log(`Start down`);
  for (const table of tables) {
    const fts = new FulltextSearch(table);
    await fts.down(queryRunner);
    console.log(`FulltextSearch ${table.tableName}.`);
  }
  console.log(`Down done!`);
}
