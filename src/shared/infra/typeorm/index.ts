import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host, // it will override the default host (database) in case of passing a host to this method
        })
    );
};