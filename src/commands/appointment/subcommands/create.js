import { db } from '../../../../index.js';
import { AppointmentService } from '../../../services/appointment.service.js';

export default {
  command: 'create',
  describe: 'Create appointment',
  builder: (yargs) => {
    yargs
      .option('id', {
        describe: 'Id of the appointment',
        type: 'string',
        demandOption: true,
      })
      .option('patient-id', {
        describe: 'Id of the patient',
        type: 'string',
        demandOption: true,
      })
      .option('doctor-id', {
        describe: 'Id of the doctor',
        type: 'string',
        demandOption: true,
      })
      .option('diagnosis', {
        alias: 'p',
        describe: 'Phone of the patient',
        type: 'string',
        demandOption: true,
      })
      .option('date', {
        alias: 'd',
        describe: 'Birth date of the patient. Format: YYYY-MM-DD hh:mm:ss',
        type: 'string',
        demandOption: true,
      });
  },
  handler: async (argv) => {
    const appointmentService = new AppointmentService(db);

    const appointment = {
      id: argv.id,
      patientId: argv['patient-id'],
      doctorId: argv['doctor-id'],
      diagnosis: argv.diagnosis,
      date: argv.date,
    };

    await appointmentService.create(appointment);
    console.log('Appointment created');
  },
};
