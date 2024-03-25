import { db } from '../../../../index.js';
import { PatientService } from '../../../services/patient.service.js';

export default {
  command: 'update',
  describe: 'Update patient',
  builder: (yargs) => {
    yargs
      .option('id', {
        describe: 'Id of the patient',
        type: 'number',
        demandOption: true,
      })
      .option('name', {
        alias: 'n',
        describe: 'Name of the patient',
        type: 'string',
      })
      .option('surname', {
        alias: 's',
        describe: 'Surname of the dopatientctor',
        type: 'string',
      })
      .option('sex', {
        describe: 'Sex of the patient',
        type: 'string',
      })
      .option('phone', {
        alias: 'p',
        describe: 'Phone of the patient',
        type: 'string',
      })
      .option('birthDate', {
        alias: 'bd',
        describe: 'Birth date of the patient. Format: YYYY-MM-DD',
        type: 'string',
      })
      .option('medicalHistory', {
        alias: 'mh',
        describe: 'Medical history of the patient',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const patientService = new PatientService(db);

    const patient = {
      id: argv.id,
      name: argv.name,
      surname: argv.surname,
      sex: argv.sex,
      phone: argv.phone,
      birthDate: argv.birthDate,
      medicalHistory: argv.medicalHistory,
    };

    await patientService.update(patient);
    console.log('Patient updated');
  },
};
