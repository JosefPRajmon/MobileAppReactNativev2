import moment from "moment";

export const NoticesConfig: any = {
  moduleID: "notices",
  title: "screen-title-notices",
  updateable: true,
  notificationEnabled: true,
  icon: {
    name: "notifications-map"
  },
  tables: [
    {
      name: "notices",
      url: "mobile/json.php?akce=mmvm_export_mapaudalosti&typ=oznameni&appID=",
      dataType: "JSON",
      columns:
        "(" +
        "id_notice NUMBER PRIMARY KEY NOT NULL," +
        "id_type NUMBER NOT NULL," +
        "name TEXT NOT NULL," +
        "description TEXT," +
        "date_from NUMBER," +
        "date_to NUMBER" +
        ")",
      values: "(?,?,?,?,?,?)",
      mappedFunction: function (o: any) {
        return [
          o.ID_oznameni,
          o.ID_druhy,
          o.nazev,
          o.popis !== "" ? o.popis : null,
          o.datum_od !== "0000-00-00" ? moment(o.datum_od).valueOf() : null,
          o.datum_od !== "0000-00-00" ? moment(o.datum_do).valueOf() : null
        ];
      }
    },
    {
      name: "notices_types",
      url: "mobile/json.php?akce=mmvm_export_mapaudalosti&typ=druhy&appID=",
      dataType: "JSON",
      columns:
        "(" +
        "id_type NUMBER PRIMARY KEY NOT NULL," +
        "type_name TEXT NOT NULL" +
        ")",
      values: "(?,?)",
      mappedFunction: function (o: any) {
        return [o.ID_druhy, o.nazev_druhu];
      }
    },
    {
      name: "notices_links",
      url: "mobile/json.php?akce=mmvm_export_mapaudalosti&typ=links&appID=",
      dataType: "JSON",
      columns:
        "(" +
        "id_notice NUMBER PRIMARY KEY NOT NULL," +
        "href TEXT NOT NULL," +
        "text TEXT NOT NULL" +
        ")",
      values: "(?,?,?)",
      mappedFunction: function (o: any) {
        return [o.ID_oznameni, o.href, o.text];
      }
    },
    {
      name: "notices_objects",
      url: "mobile/json.php?akce=mmvm_export_mapaudalosti&typ=objekty&appID=",
      dataType: "JSON",
      columns:
        "(" +
        "id_object NUMBER PRIMARY KEY NOT NULL," +
        "id_notice NUMBER NOT NULL," +
        "type TEXT NOT NULL," +
        "icon TEXT," +
        "color TEXT" +
        ")",
      values: "(?,?,?,?,?)",
      mappedFunction: function (o: any) {
        return [
          o.ID_objektu,
          o.ID_oznameni,
          o.type,
          o.icon !== "" ? o.icon : null,
          o.color
        ];
      }
    },
    {
      name: "notices_points",
      url: "mobile/json.php?akce=mmvm_export_mapaudalosti&typ=body&appID=",
      dataType: "JSON",
      columns:
        "(" +
        "id_object NUMBER NOT NULL," +
        "lat NUMBER NOT NULL," +
        "lng NUMBER NOT NULL" +
        ")",
      values: "(?,?,?)",
      mappedFunction: function (o: any) {
        return [o.ID_objektu, o.lat, o.lng];
      }
    }
  ]
};
