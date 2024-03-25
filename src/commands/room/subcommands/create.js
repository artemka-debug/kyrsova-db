import { db } from '../../../../index.js';
import { RoomService } from '../../../services/room.service.js';

export default {
  command: 'create',
  describe: 'Create room',
  builder: (yargs) => {
    yargs
      .option('department', {
        alias: 'd',
        describe: 'Department of the room',
        type: 'string',
        demandOption: true,
      })
      .option('id', {
        describe: 'Id of the room',
        type: 'string',
        demandOption: true,
      })
      .option('patient-id', {
        describe: 'Id of the patient',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const roomService = new RoomService(db);

    const room = {
      id: argv.id,
      departmentId: argv.department,
      patientId: argv['patient-id'],
    };

    await roomService.create(room);
    console.log('Room created');
  },
};
