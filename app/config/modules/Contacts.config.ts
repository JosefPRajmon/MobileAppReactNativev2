import { Alert } from "react-native";
import { DatabaseProvider } from "../../providers/DatabaseProvider";
import Getvalue, { PrimDataGet } from "./Updater";

export const ContactsConfig: any = {
    //,
    moduleID: "contacts",
    title: "screen-title-contacts",
    updateable: true,
    notificationEnabled: false,
    autoUpdateTime: function () {
        //Alert.alert("","jede to","ok")
        let db= DatabaseProvider.getInstance()
        try {
            db.loadData("SELECT value FROM updates WHERE name = contaks")
                .then((result) => {
                    Alert.alert(result)
                    console.log(result);
                    return result;
                })
                .catch((error) => {
                    console.error("Došlo k chybì:", error);
            db.updateTable({ name: "updates", columns: "name,value" }, PrimDataGet())
                .then(() => {
                    return db.loadData("SELECT value FROM updates WHERE name = contaks").then((result) => {
                        Alert.alert(result)
                        console.log(result);
                        return result;
                    })
                      //  .catch((error) => { });
                })
                .catch((error) => {
                    console.error("Došlo k chybì:", error);
                });
                });
        } catch (error) {
            console.error("Došlo k chybì:", error);
        }

    },
    dataType: "JSON",
    icon: {
        name: "contacts"
    },
    tables: [
        {
            name: "contacts_persons",
            url: "mobile/json.php?akce=contacts_new&subakce=osoby",
            dataType: 'JSON',
            columns: '(' +
                'id_person NUMBER PRIMARY KEY NOT NULL,' +
                'name TEXT NOT NULL,' +
                'surname TEXT NOT NULL,' +
                'title_before TEXT,' +
                'title_behind TEXT,' +
                'email TEXT,' +
                'phone_1 TEXT,' +
                'phone_2 TEXT,' +
                'placement TEXT,' +
                'id_job NUMBER NOT NULL,' +
                'id_building NUMBER NOT NULL' +
                ')',
            values: '(?,?,?,?,?,?,?,?,?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.jmeno,
                    item.prijmeni,
                    item.titul_pred,
                    item.titul_za !== "" ? item.titul_za : null,
                    item.email,
                    item.tel_1,
                    item.tel_2 !== "" ? item.tel_2 : null,
                    item.umisteni,
                    item.funkce_id,
                    item.budova_id
                ];
            }
        },
        {
            name: "contacts_jobs",
            url: "mobile/json.php?akce=contacts_new&subakce=funkce",
            dataType: 'JSON',
            columns: '(' +
                'id_job NUMBER PRIMARY KEY NOT NULL,' +
                'name_job TEXT NOT NULL,' +
                'description TEXT,' +
                'node NUMBER NOT NULL,' +
                'keywords TEXT,' +
                'stupen NUMBER NOT NULL,' +
                'sub_department NUMBER,' +
                'poradi NUMBER' +
                ')',
            values: '(?,?,?,?,?,?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.nazev,
                    item.detail,
                    item.uzel === 'true' ? 1 : 0,
                    item.keywords,
                    item.stupen,
                    item.d,
                    item.poradi
                ]
            },
            assignDepartments: function (jobs: any) {
                let assign: any = function (job: any) {
                    if (job.uzel === "true") {
                        return job.id;
                    } else {
                        let nextJob = {};
                        jobs.some(function (j: any) {
                            if (j.id === job.sup_id) {
                                nextJob = j;
                            }
                        });
                        return assign(nextJob);
                    }
                };
                for (let job of jobs) {
                    if (job.uzel === "false") {
                        job.d = assign(job);
                    } else {
                        job.d = "";
                    }
                }
                return jobs;
            }
        },
        {
            name: "contacts_buildings",
            url: "mobile/json.php?akce=contacts_new&subakce=budovy",
            dataType: 'JSON',
            columns: '(' +
                'id_building NUMBER PRIMARY KEY NOT NULL,' +
                'name_building TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.budova
                ];
            }
        }
    ]
}