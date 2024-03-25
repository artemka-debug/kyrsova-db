import { db } from '../../../../index.js';
import { PatientService } from '../../../services/patient.service.js';

export default {
  command: 'remove',
  describe: 'Remove a patient',
  builder: (yargs) => {
    yargs.option('id', {
      alias: 'id',
      describe: 'Id of the patient',
      type: 'number',
      demandOption: true,
    });
  },
  handler: async (argv) => {
    const patientService = new PatientService(db);

    await patientService.remove(argv.id);
    console.log('Patient removed successfully');
  },
};
