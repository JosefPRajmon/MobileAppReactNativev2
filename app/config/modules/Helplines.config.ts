export const HelplinesConfig: any = {
  moduleID: "helplines",
  title: "screen-title-helplines",
  updateable: true,
  notificationEnabled: false,
  dataType: "JSON",
  icon: {
    name: "helplines"
  },
  autoUpdateTime: 2 * 60 * 60 * 1000,
  tables: [
    {
      name: "helplines",
      url: "mobile/json.php?akce=emergnecy_phone",
      dataType: "JSON",
      columns: "(" + "title TEXT NOT NULL," + "lines TEXT" + ")",
      values: "(?,?)",
      mappedFunction: function (item: any) {
        let mapped = [item.title, JSON.stringify(item.lines)];
        return mapped;
      }
    }
  ]
};
