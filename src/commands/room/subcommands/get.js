import { db } from '../../../../index.js';
import { RoomService } from '../../../services/room.service.js';

export default {
  command: 'get',
  describe: 'Get a room(s)',
  builder: (yargs) => {
    yargs
      .option('department', {
        alias: 'd',
        describe: 'Department of the room',
        type: 'string',
      })
      .option('id', {
        describe: 'Id of the room',
        type: 'string',
      });
  },
  handler: async (argv) => {
    const roomService = new RoomService(db);

    const query = {
      departmentId: argv.department,
      id: argv.id,
    };

    const rooms = await roomService.get(query);
    console.table(rooms);
  },
};
