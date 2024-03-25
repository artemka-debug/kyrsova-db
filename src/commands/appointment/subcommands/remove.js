import { db } from '../../../../index.js';
import { AppointmentService } from '../../../services/appointment.service.js';

export default {
  command: 'remove',
  describe: 'Remove a appointment',
  builder: (yargs) => {
    yargs.option('id', {
      alias: 'id',
      describe: 'Id of the appointment',
      type: 'string',
      demandOption: true,
    });
  },
  handler: async (argv) => {
    const appointmentService = new AppointmentService(db);

    await appointmentService.remove(argv.id);
    console.log('Appointment removed successfully');
  },
};
