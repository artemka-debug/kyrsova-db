import { db } from '../../../../index.js';
import { DepartmentService } from '../../../services/department.service.js';

export default {
  command: 'create',
  describe: 'Create department',
  builder: (yargs) => {
    yargs.option('name', {
      alias: 'n',
      describe: 'Name of the department',
      type: 'string',
      demandOption: true,
    });
  },
  handler: async (argv) => {
    const departmentService = new DepartmentService(db);

    const department = {
      name: argv.name,
    };

    await departmentService.create(department);
    console.log('Department created');
  },
};
