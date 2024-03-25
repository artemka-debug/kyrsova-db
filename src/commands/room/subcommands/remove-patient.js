import { db } from '../../../../index.js';
import { RoomService } from '../../../services/room.service.js';

export default {
  command: 'remove-patient',
  describe: 'Remove a patient from the room',
  builder: (yargs) => {
    yargs
      .option('patient-id', {
        describe: 'Id of the patient',
        type: 'string',
        demandOption: true,
      })
      .option('id', {
        describe: 'Id of the room',
        type: 'string',
        demandOption: true,
      });
  },
  handler: async (argv) => {
    const roomService = new RoomService(db);

    await roomService.removePatient({
      patientId: argv['patient-id'],
      id: argv.id,
    });
    console.log('Patient removed from the room');
  },
};
