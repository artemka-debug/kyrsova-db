import { db } from '../../../../index.js';
import { DoctorService } from '../../../services/doctor.service.js';

export default {
  command: 'remove',
  describe: 'Remove a doctor',
  builder: (yargs) => {
    yargs.option('id', {
      alias: 'id',
      describe: 'Id of the doctor',
      type: 'number',
      demandOption: true,
    });
  },
  handler: async (argv) => {
    const doctorService = new DoctorService(db);

    await doctorService.remove(argv.id);
    console.log('Doctor deleted');
  },
};
