import { db } from '../../../../index.js';
import { DepartmentService } from '../../../services/department.service.js';

export default {
  command: 'get',
  describe: 'Get a department(s)',
  builder: (yargs) => {
    yargs.option('name', {
      alias: 'n',
      describe: 'Name of the department',
      type: 'string',
    });
  },
  handler: async (argv) => {
    const departmentService = new DepartmentService(db);

    const department = {
      name: argv.name,
    };

    const departments = await departmentService.get(department);
    console.table(departments);
  },
};
