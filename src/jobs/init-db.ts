/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path = require('path');
import {createConnection} from 'typeorm';
import * as dbOptions from '../ormconfig';

const tablesOrder = [
  'province',
  'district',
  'ward',
];

export default async function() {
  const conn = await createConnection(dbOptions);
  const dirPath = process.argv[3];
  if (!dirPath) {
    throw new Error('missing path');
  }
  for (const table of tablesOrder) {
    const file = path.join(dirPath, table);
    const raws = require(file);
    const t = conn.getRepository(table);
    await t.save(raws);
  }
  await conn.close();
}
