import * as SQLite from 'expo-sqlite';

import { AppConfig } from '../config/App.config';

export class DatabaseProvider {
    private static instance: DatabaseProvider;
    private db: any;

    constructor() {
        this.db = SQLite.openDatabase(AppConfig.database.name, AppConfig.database.version);
    }

    public static getInstance(): DatabaseProvider {
        if (!DatabaseProvider.instance) {
            DatabaseProvider.instance = new DatabaseProvider();
        }

        return DatabaseProvider.instance;
    }

    public getDatabase() {
        return this.db;
    }

    public loadData(sqlStatement: string, args?: any) {
        return new Promise((resolve, reject) => {
            return this.db.transaction((tx: any) => {
                return tx.executeSql(sqlStatement, args,
                    (txObj: any, { rows: { _array } }: any) => resolve(_array),
                    (txObj: any, error: any) => {
                        // console.log("DB load data tx.executeSql", sqlStatement, args);
                        reject(error);
                    });
            }, (err: any) => {
                console.log("DB load data db.transaction", sqlStatement, args);
                reject(err);
            });
        })
    }

    public updateTable(table: any, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx: any) => {
                let promises: Array<any> = [
                    tx.executeSql('DROP TABLE IF EXISTS ' + table.name),
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table.name + table.columns),
                ];

                for (let item of data) {
                    const sqlStatement = 'INSERT OR REPLACE INTO ' + table.name + ' VALUES' + table.values;
                    const args = table.mappedFunction(item);

                    //table.name.search("tourist_info") !== -1 && console.log("updateTable row", sqlStatement, args);

                    promises.push(tx.executeSql(sqlStatement, args, null,
                        (transaction: any, result: any) => console.log("ExecuteSql ok: ", result),
                        (tranaction: any, err: any) => console.log("ExecuteSql error: ", err)));
                }

                Promise.all(promises)
                    .then(() => {
                        resolve(true);
                    })
                    .catch((err) => {
                        console.error('updateTable se nezdařil!', table.name, err);
                        reject();
                    })
            },
                (err: any) => reject(err));
        });
    }

}