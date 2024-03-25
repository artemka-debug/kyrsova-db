import { db } from '../../../../index.js';
import { AppointmentService } from '../../../services/appointment.service.js';

export default {
  command: 'get',
  describe: 'Get a appointment(s)',
  builder: (yargs) => {
    yargs.option('id', {
      describe: 'Id of the appointment',
      type: 'string',
    });
  },
  handler: async (argv) => {
    const appointmentService = new AppointmentService(db);

    const query = {
      id: argv.id,
    };

    const appointments = await appointmentService.get(query);
    console.table(appointments);
  },
};
