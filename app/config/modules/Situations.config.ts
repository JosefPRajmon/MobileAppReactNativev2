import moment from 'moment';

export const SituationsConfig: any = {
    moduleID: "situations",
    title: "screen-title-situations",
    updateable: true,
    notificationEnabled: false,
    dataType: "JSON",
    icon: {
        name: "situations"
    },
    autoUpdateTime: 2 * 60 * 60 * 1000,
    tables: [
        {
            name: "situations",
            url: "mobile/json.php?akce=mmvm_export_zivotnisituace&appID=",
            dataType: 'JSON',
            columns: '(' +
                'id_situation NUMBER PRIMARY KEY NOT NULL,' +
                'id_section NUMBER NOT NULL,' +
                'keywords TEXT,' +
                'point_1 NUMBER,' +
                'point_2 TEXT,' +
                'point_3 TEXT NOT NULL,' +
                'point_4 TEXT ,' +
                'point_5 TEXT ,' +
                'point_6 TEXT ,' +
                'point_7 TEXT ,' +
                'point_8 TEXT ,' +
                // point_9 - Kde, s kým a kdy můžete tuto životní situaci řešit, id na funkce (zvláštní tabulka)
                'point_10 TEXT ,' +
                'point_11 TEXT ,' + // Formuláře (JSON.string)
                'point_12 TEXT ,' +
                'point_13 TEXT ,' +
                'point_14 TEXT ,' + // Další účastníci (dotčení) postupu (JSON.string)
                'point_15 TEXT ,' +
                'point_16 TEXT ,' + // Můžete využít tuto elektronickou službu (JSON.string)
                'point_17 TEXT ,' + // Podle kterého právního předpisu se postupuje (JSON.string)
                'point_18 TEXT ,' + // Související předpisy (JSON.string)
                'point_19 TEXT ,' +
                'point_20 TEXT ,' +
                'point_21 TEXT ,' + // Faq (JSON.string)
                'point_22 TEXT ,' + // Další informace (JSON.string)
                'point_23 TEXT ,' + // Informace z jiných zdrojů (JSON.string)
                // point_24 - Související životní situace - zvláštní tabulka
                'point_25 NUMBER ,' + // id_osoby
                'point_26 NUMBER ,' + // id_osoby
                'point_27 NUMBER ,' + // datum
                'point_28 NUMBER ,' + // datum
                'point_29 NUMBER ,' + // datum
                'point_30 TEXT' +
                ')',
            values: '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.sekce,
                    item.keywords,
                    item.bod1,
                    item?.bod2 !== "" ? item.bod2 : null,
                    item.bod3,
                    item.bod4,
                    item.bod5,
                    item.bod6,
                    item.bod7,
                    item.bod8,
                    // point_9 - zatím vynecháno
                    item.bod10,
                    JSON.stringify(item.bod11),
                    item.bod12,
                    item.bod13,
                    JSON.stringify(item.bod14),
                    item.bod15,
                    JSON.stringify(item.bod16),
                    JSON.stringify(item.bod17),
                    JSON.stringify(item.bod18),
                    item.bod19,
                    item.bod20,
                    JSON.stringify(item.bod21),
                    JSON.stringify(item.bod22),
                    JSON.stringify(item.bod23),
                    // point_24 - vynecháno
                    item.bod25,
                    item.bod26,
                    item.bod27 ? moment(item.bod27, 'YYYY-MM-DD').valueOf() : null,
                    item.bod28 ? moment(item.bod28, 'YYYY-MM-DD').valueOf() : null,
                    item.bod29 ? moment(item.bod29, 'YYYY-MM-DD').valueOf() : null,
                    item.bod30
                ];
            }
        },
        {
            name: "situations_sections",
            url: "mobile/json.php?akce=mmvm_export_zivotnisituace_struktury&appID=",
            dataType: 'JSON',
            columns: '(' +
                'id_section NUMBER PRIMARY KEY NOT NULL,' +
                'name_section TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.nazev
                ]
            }
        },
        {
            name: "situations_points",
            url: "mobile/json.php?akce=mmvm_export_zivotnisituace_body&appID=",
            dataType: 'JSON',
            columns: '(' +
                'id_point NUMBER PRIMARY KEY NOT NULL,' +
                'name_point TEXT NOT NULL,' +
                'level NUMBER NOT NULL' +
                ')',
            values: '(?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.nazev,
                    item.uroven
                ];
            }
        },
        {
            name: "situations_points",
            url: "mobile/json.php?akce=mmvm_export_zivotnisituace_body&appID=",
            dataType: 'JSON',
            columns: '(' +
                'id_point NUMBER PRIMARY KEY NOT NULL,' +
                'name_point TEXT NOT NULL,' +
                'level NUMBER NOT NULL' +
                ')',
            values: '(?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.nazev,
                    item.uroven
                ];
            }
        },
        {
            name: "situations_functions",
            url: "mobile/json.php?akce=mmvm_export_zivotnisituace_funkce&appID=",
            dataType: 'JSON',
            columns: '(' +
                'id_function NUMBER NOT NULL,' +
                'id_situation NUMBER NOT NULL,' +
                'text TEXT NOT NULL' +
                ')',
            values: '(?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.zsID,
                    item.text
                ];
            }
        },
        {
            name: "situations_related",
            url: "mobile/json.php?akce=mmvm_export_zivotnisituace_souvisejici&appID=",
            dataType: 'JSON',
            columns: '(' +
                'id_related NUMBER NOT NULL,' +
                'id_situation NUMBER NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.zsID, item.souv_zsID
                ];
            }
        }
    ]
}