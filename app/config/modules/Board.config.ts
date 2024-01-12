import moment from 'moment';

export const BoardConfig: any = {
    moduleID: "board",
    title: "screen-title-board",
    updateable: true,
    notificationEnabled: true,
    icon: {
        name: "official-board"
    },
    dataType: "XML",
    detailUrl: "redakce/index.php?clanek=&lanG=cs&slozka=&detail_claim=",
    tables: [
        {
            name: "board_items",
            url: "mobile/json.php?akce=mmvm_export_urednideska_n&appID=&typ=oznameni",
            dataType: 'JSON',
            columns: '(' +
                'id_notice NUMBER PRIMARY KEY NOT NULL,' +
                'title TEXT NOT NULL,' +
                'id_type NUMBER NOT NULL,' +
                'id_source NUMBER NOT NULL,' +
                'reference_no TEXT NOT NULL,' +
                'evidence_no TEXT NOT NULL,' +
                'date_from NUMBER,' +
                'date_to NUMBER,' +
                'date_pretty TEXT NOT NULL' +
                ')',
            values: '(?,?,?,?,?,?,?,?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.nadpis,
                    item.typ,
                    item.zdroj,
                    item.cislo_jednaci,
                    item.cislo_evidencni,
                    // moment(item.od).format('D.M.YYYY'),
                    moment(item.od).valueOf(),
                    ((item.do !== '0000-00-00') ? moment(item.do).valueOf() : null),
                    this.formatDate(item.od, item.do)
                ];
            },
            formatDate(date_from: number, date_to: number) {
                let date = moment(date_from, 'YYYY-MM-DD').format("D.M.YYYY");

                if (date_to) {
                    date += " - " + moment(date_to, 'YYYY-MM-DD').format("D.M.YYYY")
                }

                return date;
            }
        },
        {
            name: "board_types",
            url: "mobile/json.php?akce=mmvm_export_urednideska_n&appID=&typ=typy",
            dataType: 'JSON',
            columns: '(' +
                'id_type NUMBER PRIMARY KEY NOT NULL,' +
                'type_name TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.name
                ];
            }
        },
        {
            name: "board_sources",
            url: "mobile/json.php?akce=mmvm_export_urednideska_n&appID=&typ=zdroje",
            dataType: 'JSON',
            columns: '(' +
                'id_source NUMBER PRIMARY KEY NOT NULL,' +
                'source_name TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (item: any) {
                return [
                    item.id,
                    item.name
                ];
            }
        }
    ],
    autoUpdateTime: 2 * 60 * 60 * 1000
}