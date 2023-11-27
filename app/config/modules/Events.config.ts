import moment from 'moment';

export const EventsConfig: any = {
    moduleID: "events",
    title: "screen-title-events",
    updateable: true,
    notificationEnabled: true,
    dataType: "JSON",
    icon: {
        name: "events"
    },
    autoUpdateTime: 2 * 60 * 60 * 1000,
    tables: [
        {
            name: "events_items",
            url: "mobile/json.php?akce=mmvm_export_akce",
            dataType: 'JSON',
            columns: '(' +
                'id_event NUMBER PRIMARY KEY NOT NULL,' +
                'id_type NUMBER NOT NULL,' +
                'id_char NUMBER NOT NULL,' +
                'id_place NUMBER NOT NULL,' +
                'name TEXT NOT NULL,' +
                'length_priority NUMBER NOT NULL,' +
                'description TEXT,' +
                'organizer TEXT,' +
                'anotation TEXT,' +
                'link TEXT,' +
                'id_thumb NUMBER' +
                ')',
            values: '(?,?,?,?,?,?,?,?,?,?,?)',
            mappedFunction: function (i: any) {
                return [
                    i.eventID,
                    i.etID,
                    i.echID,
                    i.placeID,
                    i.name,
                    i.length_priority,
                    i.description,
                    i.organizer,
                    i.anotation,
                    i.url !== "" ? i.url : null,
                    i.obrID !== 0 ? i.obrID : null
                ];
            }
        },
        {
            name: "events_dates",
            url: "mobile/json.php?akce=mmvm_export_akce&type=dates",
            dataType: 'JSON',
            columns: '(' +
                'id_event NUMBER PRIMARY KEY NOT NULL,' +
                'date_start NUMBER NOT NULL,' +
                'date_end NUMBER,' +
                'time_start NUMBER,' +
                'time_end NUMBER,' +
                'datetime_start NUMBER,' +
                'datetime_end NUMBER,' +
                'pretty TEXT NOT NULL' +
                ')',
            values: '(?,?,?,?,?,?,?,?)',
            mappedFunction: function (i: any) {
                return [
                    i.eventID,
                    moment(i.date_start, 'YYYY-MM-DD').valueOf(),
                    i.date_end ? moment(i.date_end, 'YYYY-MM-DD').valueOf() : null,
                    i.time_start ? moment(i.time_start, 'HH:mm:ss').valueOf() : null,
                    i.time_end ? moment(i.time_end, 'HH:mm:ss').valueOf() : null,
                    moment((i.date_start + ' ' + i.time_start), 'YYYY-MM-DD HH:mm:ss').valueOf(),
                    i.date_end ? moment((i.date_end + ' ' + i.time_end), 'YYYY-MM-DD HH:mm:ss').valueOf() : null,
                    this.formatDate(i.date_start, i.date_end, i.time_start, i.time_end)
                ]
            },
            formatDate(date_start: string, date_end: string, time_start: string, time_end: string) {

                var date = moment(date_start, 'YYYY-MM-DD').format("D.M.YYYY");

                if (date_end && date_end !== date_start) {
                    date += ' až ' + moment(date_end, 'YYYY-MM-DD').format("D.M.YYYY");
                }
                if (time_start) {
                    date += ' od ' + moment(time_start, 'HH:mm:ss').format("H:mm");
                    if (time_end) {
                        date += ' do ' + moment(time_end, 'HH:mm:ss').format("H:mm");
                    }
                }
                return date;

            }
        },
        {
            name: "events_places",
            url: "mobile/json.php?akce=mmvm_export_akce&type=places",
            dataType: 'JSON',
            columns: '(' +
                'id_place NUMBER PRIMARY KEY NOT NULL,' +
                'name TEXT NOT NULL,' +
                'gps TEXT,' +
                'street TEXT,' +
                'town TEXT,' +
                'cp TEXT,' +
                'co TEXT,' +
                'psc TEXT,' +
                'pretty TEXT' +
                ')',
            values: '(?,?,?,?,?,?,?,?,?)',
            mappedFunction: function (o: any) {
                return [
                    o.placeID,
                    o.name_place,
                    o.gps ? JSON.stringify(o.gps) : null,
                    o.ulice,
                    o.obec,
                    o.cp,
                    o.co,
                    o.psc ? o.psc : null,
                    this.formatPlace(o.name_place, o.ulice, o.cp, o.co, o.obec, o.psc)
                ];
            },
            formatPlace(name: string, ulice: string, cislo_domu: string, cislo_orientacni: string, obec: string, psc: any) {
                var formated = name;
                if (ulice) {
                    formated += ", " + ulice;
                    if (cislo_domu) {
                        formated += " " + cislo_domu;
                        if (cislo_orientacni) {
                            formated += "/" + cislo_orientacni;
                        }
                    }
                }
                if (obec) {
                    formated += ", \n" + obec;
                    if (psc && psc != 0) {
                        formated += " " + psc;
                    }
                }
                return formated;
            }
        },
        {
            name: "events_character",
            url: "mobile/json.php?akce=mmvm_export_akce&type=characters",
            dataType: 'JSON',
            columns: '(' +
                'id_char NUMBER PRIMARY KEY NOT NULL,' +
                'name_char TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (o: any) {
                return [
                    o.echID,
                    o.name
                ];
            }
        },
        {
            name: "events_types",
            url: "mobile/json.php?akce=mmvm_export_akce&type=types",
            dataType: 'JSON',
            columns: '(' +
                'id_type NUMBER PRIMARY KEY NOT NULL,' +
                'name_type TEXT NOT NULL' +
                ')',
            values: '(?,?)',
            mappedFunction: function (o: any) {
                return [
                    o.etID,
                    o.name
                ];
            }
        }
    ]
}