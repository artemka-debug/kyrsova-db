import { db } from '../../../../index.js';
import { DoctorService } from '../../../services/doctor.service.js';

export default {
  command: 'create',
  describe: 'Create doctor',
  builder: (yargs) => {
    yargs
      .option('id', {
        describe: 'Id of the doctor',
        type: 'number',
        demandOption: true,
      })
      .option('name', {
        alias: 'n',
        describe: 'Name of the doctor',
        type: 'string',
        demandOption: true,
      })
      .option('surname', {
        alias: 's',
        describe: 'Surname of the doctor',
        type: 'string',
        demandOption: true,
      })
      .option('department', {
        alias: 'd',
        describe: 'Department of the doctor',
        type: 'string',
        demandOption: true,
      })
      .option('contact', {
        alias: 'c',
        describe: 'Contact of the doctor',
        type: 'string',
        demandOption: true,
      })
      .option('specialty', {
        alias: 'sp',
        describe: 'Specialty of the doctor',
        type: 'string',
        demandOption: true,
      });
  },
  handler: async (argv) => {
    const doctorService = new DoctorService(db);

    const doctor = {
      name: argv.name,
      surname: argv.surname,
      department: argv.department,
      contact: argv.contact,
      id: argv.id,
      specialty: argv.specialty,
    };

    await doctorService.create(doctor);
    console.log('Doctor created');
  },
};
