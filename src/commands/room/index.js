import createSubcommand from './subcommands/create.js';
import getSubcommand from './subcommands/get.js';
import addPatientSubcommand from './subcommands/add-patient.js';
import removePatientSubcommand from './subcommands/remove-patient.js';
import removeSubcommand from './subcommands/remove.js';

const subCommands = [
  createSubcommand,
  getSubcommand,
  addPatientSubcommand,
  removePatientSubcommand,
  removeSubcommand,
];

const availableSubCommands = subCommands.map(
  (subCommand) => subCommand.command
);
const roomCommand = {
  name: 'room',
  command: `room <${availableSubCommands.join('|')}>`,
  describe: 'Using this command you can operate with room',
  builder: (yargs) => {
    for (const subCommand of subCommands) {
      yargs.command(subCommand);
    }
  },
};

export default roomCommand;
