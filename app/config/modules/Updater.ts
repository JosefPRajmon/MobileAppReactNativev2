import { forEach, remove } from "lodash";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseProvider } from "../../providers/DatabaseProvider";

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
        console.log("work")
    } catch (e) {
        console.log(e)
    }
}

const  getData = async () => {
    try {
        //const jsonValue = await AsyncStorage.getItem('@storage_Key')
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
        let pole = [{ "name": 'contaks', value: 1 }, { "name": 'contakss', value: 2 }];
        return pole
    } catch (e) {
        console.log(e)
        return new Array({ "name": 'contaks', value: 1 }, { "name": 'contakss', value: 2 })
        // error reading value
    }
}
export function PrimDataGet() {
    return getData().then(result => {
        console.log("result: " + JSON.stringify(result))
        return result;
        //return resultArray;
    });
}

export const updater: any = {
    moduleID: "board",
    title: "screen-title-board",
    updateable: true,
    notificationEnabled: true,
    icon: {
        name: "updater_table"
    },
    dataType: "XML",
    tables: [
        {
            name: "Updates",
            dataType: 'JSON',
            columns: '(' +
                'id_notice NUMBER PRIMARY KEY NOT NULL,' +
                'title TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            defaultValues: 
                getData().then((data) => {
                    updater.tables[0].defaultValues = data;
                })
            ,

            mappedFunction: function (item: any) {
                Alert.alert(item[1] + " " + item[0])
                return [
                    item.id,
                    item.nadpis,
                ];
            },
            updateFunction: function (newValues: any) { 
                this.defaultValues = newValues;
            }
        }
    ]
}

export function Save() {
    let db = DatabaseProvider.getInstance()
    //storeData(updater.tables[0]);
    try {
 db.updateTable({ name: "updates", columns: " (name, value)" }, PrimDataGet()).then((result) => {
       // Alert.alert(result)
        console.log(result);
        return result;
    })
        .catch((error) => {
            console.error("Došlo k chybě:", error);
            db.updateTable({ name: "updates", columns: " (name, value)" }, PrimDataGet())
                .then(() => {
                    return db.loadData("SELECT value FROM updates WHERE name = contaks").then((result) => {
                        //Alert.alert(result)
                        //console.log(result);
                        return result;
                    })
                       // .catch((error) => { });
                })
                .catch((error) => {
                    console.error("Došlo k chybě zde:", error);
                });
        });
    } catch (e) {
        Alert.alert("","test try catch")
    }
   
}

export default function Getvalue(title: number) {
    switch (title) {
                case 1:
                    return 1 * 60 * 60 * 1000
                case 2:
                    return 6 * 60 * 60 * 1000
                case 3:
                    return 12 * 60 * 60 * 1000
                case 4:
                    return 24 * 60 * 60 * 1000
                case 5:
                    return 7 * 24 * 60 * 60 * 1000
                case 6:
                    return 30 * 24 * 60 * 60 * 1000
                default: return;
            }

}

export function GetvalueIndex(title: string) {
    for (let i = 0; i < updater.tables[0].defaultValues.length; i++) {
        //Alert.alert(updater.tables[0].defaultValues[i][1] + " test gvi " + updater.tables[0].defaultValues[i][0])
            console.log("test value: "+updater.tables[0].defaultValues[i]["value"])
        if (updater.tables[0].defaultValues[i][1] === title) {
            return updater.tables[0].defaultValues[i]["value"];
        }
        //Alert.alert(updater.tables[0].defaultValues[i][1])
    }


    return null;
}