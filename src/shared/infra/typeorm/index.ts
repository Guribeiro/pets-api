import { createConnection, getConnectionOptions } from 'typeorm';

type IOptions = {
  host: string;
};

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database';
  createConnection({
    ...options,
  });
});
