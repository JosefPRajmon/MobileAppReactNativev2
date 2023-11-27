export const PlacesConfig: any = {
  moduleID: "places",
  title: "screen-title-places",
  updateable: true,
  notificationEnabled: false,
  icon: {
    name: "notifications-map"
  },
  tables: [
    {
      name: "places",
      url: "mobile/json.php?akce=mmvm_export_ds&hkatIDs=&showData=skat;popis;text;tel;mail;www;adr;hkat",
      dataType: "JSON",
      columns:
        "(" +
        "id_place NUMBER PRIMARY KEY NOT NULL," +
        "id_skat NUMBER NOT NULL," +
        "id_hkat NUMBER NOT NULL," +
        "name TEXT NOT NULL," +
        "description TEXT," +
        "full_text TEXT," +
        "phone NUMBER NOT NULL," +
        "mail TEXT NOT NULL," +
        "link TEXT ," +
        "address TEXT ," +
        "lat NUMBER," +
        "lng NUMBER" +
        ")",
      values: "(?,?,?,?,?,?,?,?,?,?,?,?)",
      mappedFunction: function (o: any) {
        return [
          o.recordID,
          o.skatID,
          o.hkatID,
          o.nazev,
          o.popis,
          o.text,
          JSON.stringify(o.tel),
          JSON.stringify(o.mail),
          JSON.stringify(o.www),
          this.formatAddress(
            o.adresa.ulice,
            o.adresa.cp,
            o.adresa.co,
            o.adresa.obec,
            o.adresa.psc
          ),
          o.adresa_gps_sirka,
          o.adresa_gps_delka
        ];
      },
      formatAddress(ulice: any, cp: any, co: any, obec: any, psc: any) {
        let formated = "";
        if (ulice) {
          formated += ulice;
          if (cp) {
            formated += " " + cp;
            if (co) {
              formated += "/" + co;
            }
          }
        }
        if (obec) {
          formated += ", " + obec;
          if (psc && psc != 0) {
            formated += " " + psc;
          }
        }
        return formated;
      }
    },
    {
      name: "places_hkat",
      url: "mobile/json.php?akce=mmvm_export_ds&showType=kats",
      dataType: "JSON",
      columns:
        "(" +
        "id_hkat NUMBER PRIMARY KEY NOT NULL," +
        "name_hkat TEXT NOT NULL" +
        ")",
      values: "(?,?)",
      mappedFunction: function (o: any) {
        return [o.hkatID, o.name];
      }
    },
    {
      name: "places_skat",
      url: "mobile/json.php?akce=mmvm_export_ds&hkatIDs=&showType=skats",
      dataType: "JSON",
      columns:
        "(" +
        "id_skat NUMBER PRIMARY KEY NOT NULL," +
        "name_skat TEXT NOT NULL" +
        ")",
      values: "(?,?)",
      mappedFunction: function (o: any) {
        return [o.skatID, o.name];
      }
    }
  ]
};
