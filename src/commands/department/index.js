import createSubcommand from './subcommands/create.js';
import getSubcommand from './subcommands/get.js';
import removeSubcommand from './subcommands/remove.js';

const subCommands = [createSubcommand, getSubcommand, removeSubcommand];

const availableSubCommands = subCommands.map(
  (subCommand) => subCommand.command
);
const departmentCommand = {
  name: 'department',
  command: `department <${availableSubCommands.join('|')}>`,
  describe: 'Using this command you can operate with department',
  builder: (yargs) => {
    for (const subCommand of subCommands) {
      yargs.command(subCommand);
    }
  },
};

export default departmentCommand;
