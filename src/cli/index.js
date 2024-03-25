import yargs from 'yargs/yargs';

import doctorCommand from '../commands/doctor/index.js';
import roomCommand from '../commands/room/index.js';
import patientCommand from '../commands/patient/index.js';
import departmentCommand from '../commands/department/index.js';
import appointmentCommand from '../commands/appointment/index.js';

export function setupCli() {
  const commands = [
    doctorCommand,
    roomCommand,
    patientCommand,
    departmentCommand,
    appointmentCommand,
  ];

  const cli = yargs(process.argv.slice(2));

  for (const command of commands) {
    cli.command(command);
  }

  cli
    .help()
    .check((argv) => {
      return commands.some((command) => argv._.includes(command.name));
    })
    .parse();

  return cli;
}

export default setupCli;
