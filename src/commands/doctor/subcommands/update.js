import { db } from '../../../../index.js';
import { DoctorService } from '../../../services/doctor.service.js';

export default {
  command: 'update',
  describe: 'Update doctor',
  builder: (yargs) => {
    yargs
      .option('id', {
        describe: 'Id of the doctor',
        type: 'number',
        demandOption: true,
      })
      .option('contact', {
        alias: 'c',
        describe: 'Contact of the doctor',
        type: 'string',
      })
      .option('name', {
        alias: 'n',
        describe: 'Name of the doctor',
        type: 'string',
      })
      .option('surname', {
        alias: 's',
        describe: 'Surname of the doctor',
        type: 'string',
      })
      .option('specialty', {
        alias: 'sp',
        describe: 'Specialty of the doctor',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const doctorService = new DoctorService(db);

    const doctor = {
      id: argv.id,
      name: argv.name,
      surname: argv.surname,
      contact: argv.contact,
      specialty: argv.specialty,
    };

    await doctorService.update(doctor);
    console.log('Doctor updated');
  },
};
