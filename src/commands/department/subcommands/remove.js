import { db } from '../../../../index.js';
import { DepartmentService } from '../../../services/department.service.js';

export default {
  command: 'remove',
  describe: 'Remove a department',
  builder: (yargs) => {
    yargs.option('id', {
      alias: 'id',
      describe: 'Id of the department',
      type: 'string',
      demandOption: true,
    });
  },
  handler: async (argv) => {
    const departmentService = new DepartmentService(db);

    await departmentService.remove(argv.id);
    console.log('Department deleted');
  },
};
