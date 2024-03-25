export function handleShutdown(callbacks) {
  const shutdownEvents = [
    'exit',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'uncaughtException',
  ];

  for (const callback of callbacks) {
    for (const event of shutdownEvents) {
      process.on(event, exitHandler(callback));
    }
  }
}

function exitHandler(cb) {
  return async () => {
    await cb();
    process.exit();
  };
}
