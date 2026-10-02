import { spawnSync } from 'node:child_process';

function execute(command, args) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    timeout: 600_000,
    maxBuffer: 32 * 1024 * 1024,
  });

  if (result.error || result.signal || result.status === null) {
    throw new Error(`${command} failed: ${result.error?.message ?? result.signal}`);
  }

  return result;
}

function checked(run, command, args) {
  const result = run(command, args);

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed: ${result.stderr}`);
  }

  return result;
}

export { execute, checked };
