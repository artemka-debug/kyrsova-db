export class DepartmentService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async get(query) {
    const [results] = await this.#db.getWithParams({
      table: 'Department',
      params: {
        Name: query.name,
      },
    });

    return results;
  }

  async create(department) {
    await this.#db.create({
      table: 'Department',
      params: {
        Name: department.name,
      },
    });
  }

  async remove(departmentId) {
    await this.#db.remove({
      table: 'Department',
      where: {
        DepartmentId: departmentId,
      },
    });
  }
}
