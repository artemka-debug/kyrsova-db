import { db } from '../../../../index.js';
import { AppointmentService } from '../../../services/appointment.service.js';

export default {
  command: 'update',
  describe: 'Update appointment',
  builder: (yargs) => {
    yargs
      .option('id', {
        describe: 'Id of the appointment',
        type: 'string',
        demandOption: true,
      })
      .option('date', {
        alias: 'd',
        describe: 'Date of the appointment. Format: YYYY-MM-DD hh:mm:ss',
        type: 'string',
      })
      .option('diagnosis', {
        alias: 'dg',
        describe: 'Diagnosis of the appointment',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const appointmentService = new AppointmentService(db);

    const appointment = {
      id: argv.id,
      date: argv.date,
      diagnosis: argv.diagnosis,
    };

    await appointmentService.update(appointment);
    console.log('Appointment updated');
  },
};
