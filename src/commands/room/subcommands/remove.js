import { db } from '../../../../index.js';
import { RoomService } from '../../../services/room.service.js';

export default {
  command: 'remove',
  describe: 'Remove room',
  builder: (yargs) => {
    yargs.option('id', {
      describe: 'Id of the room',
      type: 'number',
      demandOption: true,
    });
  },
  handler: async (argv) => {
    const roomService = new RoomService(db);

    await roomService.remove(argv.id);
    console.log('Room removed');
  },
};
