import mysql from 'mysql2/promise';

export class DB {
  #connection;

  async connect() {
    this.#connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'hospital_database',
    });
  }

  execute(query, params) {
    return this.#connection.execute(query, params);
  }

  create(options) {
    return this.#withError(() => {
      const { table, params } = options;
      const fields = Object.keys(params);
      const fieldsToInsert = [];
      const values = [];

      for (const field of fields) {
        const value = params[field];

        if (value || value === null) {
          values.push(value);
          fieldsToInsert.push(field);
        }
      }

      const sqlQuery = `INSERT INTO ${table} (${fieldsToInsert.join(
        ', '
      )}) VALUES (${fieldsToInsert.map(() => '?').join(', ')})`;

      return this.execute(sqlQuery, values);
    });
  }

  update(options) {
    return this.#withError(() => {
      const { table, params } = options;
      const fields = Object.keys(params);
      const fieldsToUpdate = [];
      const values = [];

      for (const field of fields) {
        const value = params[field];

        if (value || value === null) {
          values.push(value);
          fieldsToUpdate.push(field);
        }
      }

      const whereKeys = Object.keys(options.where);
      const where = whereKeys.map((key) => `\`${key}\` = ?`).join(' AND ');

      const sqlQuery = `UPDATE ${table} SET ${fieldsToUpdate
        .map((field) => `${field} = ?`)
        .join(', ')} WHERE ${where}`;
      console.log('sqlQuery', sqlQuery);
      console.log('values', values, options.where);

      return this.execute(sqlQuery, [
        ...values,
        ...Object.values(options.where),
      ]);
    });
  }

  remove(options) {
    return this.#withError(() => {
      const { table, where } = options;
      const whereKeys = Object.keys(where);
      const whereValues = Object.values(where);

      const sqlQuery = `DELETE FROM ${table} WHERE ${whereKeys
        .map((key) => `${key} = ?`)
        .join(' AND ')}`;

      return this.execute(sqlQuery, whereValues);
    });
  }

  getWithParams(options) {
    return this.#withError(() => {
      const { table, params } = options;

      const fields = Object.keys(params);
      const conditions = [];
      const values = [];

      for (const field of fields) {
        const value = params[field];

        if (value) {
          conditions.push(`${field} = ?`);
          values.push(value);
        }
      }

      const sqlQuery = `SELECT * FROM ${table} ${
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
      }`;

      return this.execute(sqlQuery, values);
    });
  }

  async end() {
    await this.#connection.end();
  }

  async #withError(cb) {
    try {
      return await cb();
    } catch (error) {
      const message = error.message || error.sqlMessage;
      throw new Error(`DB error: ${message}`);
    }
  }
}
