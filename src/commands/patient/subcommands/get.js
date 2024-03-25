import { db } from '../../../../index.js';
import { PatientService } from '../../../services/patient.service.js';

export default {
  command: 'get',
  describe: 'Get a patient(s)',
  builder: (yargs) => {
    yargs
      .option('name', {
        alias: 'n',
        describe: 'Name of the patient',
        type: 'string',
      })
      .option('id', {
        describe: 'Id of the patient',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const patientService = new PatientService(db);

    const query = {
      name: argv.name,
      id: argv.id,
    };

    const patients = await patientService.get(query);
    console.table(patients);
  },
};
