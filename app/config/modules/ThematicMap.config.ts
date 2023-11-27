export const ThematicMapConfig: any = {
    moduleID: "thematicMap",
    title: "screen-title-thematic-map",
    updateable: true,
    notificationEnabled: false,
    icon: {
        name: "trips"
    },
    tables: [
        {
            name: "thematic_map",
            url: "mobile/json.php?akce=mmvm_export_mapatematicka&typ=objekty",
            dataType: 'JSON',
            columns: '(' +
                'id_object NUMBER PRIMARY KEY NOT NULL,' +
                'id_type NUMBER NOT NULL,' +
                'name TEXT NOT NULL,' +
                'type TEXT NOT NULL,' + // point | polygon | line
                'description TEXT,' + // HTML
                'id_thumb NUMBER,' + // id of image
                'street TEXT,' +
                'town TEXT,' +
                'psc NUMBER,' +
                'phone NUMBER,' +
                'email TEXT,' +
                'link TEXT,' +
                'fill_color TEXT,' +
                'line_color TEXT,' +
                'opacity NUMBER,' +
                'line_width NUMBER,' +
                'icon_name TEXT' +
                ')',
            values: '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            mappedFunction: function (o: any) {
                return [
                    o.ID_objektu,
                    o.ID_druh,
                    o.nazev,
                    o.typ,
                    o.popis,
                    o.obrazek,
                    o.ulice,
                    o.mesto,
                    o.psc,
                    o.telefon,
                    o.email,
                    o.www,
                    o.barva,
                    o.ohraniceni_barva,
                    o.pruhlednost,
                    o.sirka,
                    o.ikona ? o.ikona.split(".")[0] : null
                ];
            }
        },
        {
            name: "thematic_map_types",
            url: "mobile/json.php?akce=mmvm_export_mapatematicka&typ=druhy",
            dataType: 'JSON',
            columns: '(' +
                'id_type NUMBER PRIMARY KEY NOT NULL,' +
                'type_name TEXT NOT NULL,' +
                'icon_name TEXT NOT NULL' +
                ')',
            values: '(?,?,?)',
            mappedFunction: function (o: any) {
                return [
                    o.ID_druhy,
                    o.nazev_druhu,
                    o.ico
                ];
            }
        },
        {
            name: "thematic_map_points",
            url: "mobile/json.php?akce=mmvm_export_mapatematicka&typ=body",
            dataType: 'JSON',
            columns: '(' +
                'id_object NUMBER,' +
                'lat NUMBER NOT NULL,' +
                'lng NUMBER NOT NULL' +
                ')',
            values: '(?,?,?)',
            mappedFunction: function (o: any) {
                return [
                    o.ID_objektu,
                    o.lat,
                    o.lng
                ];
            }
        }
    ]
}