import createSubcommand from './subcommands/create.js';
import getSubcommand from './subcommands/get.js';
import removeSubcommand from './subcommands/remove.js';
import updateSubcommand from './subcommands/update.js';

const subCommands = [
  createSubcommand,
  getSubcommand,
  removeSubcommand,
  updateSubcommand,
];

const availableSubCommands = subCommands.map(
  (subCommand) => subCommand.command
);
const appointmentCommand = {
  name: 'appointment',
  command: `appointment <${availableSubCommands.join('|')}>`,
  describe: 'Using this command you can operate with appointment',
  builder: (yargs) => {
    for (const subCommand of subCommands) {
      yargs.command(subCommand);
    }
  },
};

export default appointmentCommand;
