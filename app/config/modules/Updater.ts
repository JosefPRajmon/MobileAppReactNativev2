import { forEach, remove } from "lodash";
import { Alert } from "react-native";

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
            defaultValues: [[1, 'contaks'], [2, 'Default Title 2']], // Pøidání dvou výchozích hodnot
            mappedFunction: function (item: any) {
                Alert.alert(item[1] + " " + item[0])
                return [
                    item.id,
                    item.nadpis,
                ];
            },
            updateFunction: function(newValues: any) { // Pøidání funkce pro zmìnu hodnot
                this.defaultValues = newValues;
            }
        }
    ]
}
export default function Getvalue(title: string) {
    for (let i = 0; i < updater.tables[0].defaultValues.length; i++) {
        if (updater.tables[0].defaultValues[i][1] === title) {
            switch (updater.tables[0].defaultValues[i][0]) {
                case 1:
                    return 1*60*60*1000
                case 2:
                    return 6*60*60*1000
                case 3:
                    return 12*60*60*1000
                case 4:
                    return 24*60*60*1000
                case 5:
                    return 7*24*60*60*1000
                case 6:
                    return 30*24*60*60*1000
                default: return;
            }
            return ;
        }
    }
    return null; 
}

export function GetvalueIndex(title: string) {
    for (let i = 0; i < updater.tables[0].defaultValues.length; i++) {
        //Alert.alert(updater.tables[0].defaultValues[i][1] + " test gvi " + updater.tables[0].defaultValues[i][0])
        if (updater.tables[0].defaultValues[i][1] === title) {
           
            return updater.tables[0].defaultValues[i][0] ;
        }
        //Alert.alert(updater.tables[0].defaultValues[i][1])
    }

    
    return null; 
}
