import { db } from '../../../../index.js';
import { DoctorService } from '../../../services/doctor.service.js';

export default {
  command: 'get',
  describe: 'Get a doctor(s)',
  builder: (yargs) => {
    yargs
      .option('name', {
        alias: 'n',
        describe: 'Name of the doctor',
        type: 'string',
      })
      .option('id', {
        describe: 'Id of the doctor',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const doctorService = new DoctorService(db);

    const doctors = await doctorService.get({
      name: argv.name,
      id: argv.id,
    });

    console.table(doctors);
  },
};
