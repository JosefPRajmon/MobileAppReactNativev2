import moment from 'moment';

export const LossesConfig: any = {
  moduleID: 'losses',
  title: 'screen-title-losses',
  updateable: true,
  notificationEnabled: true,
  dataType: 'JSON',
  icon: {
    name: 'events-map'
  },
  autoUpdateTime: 2 * 60 * 60 * 1000,
  tables: [
    {
      name: 'losses_items',
      url: 'mobile/json.php?app=12&akce=ztratyanalezy',
      dataType: 'JSON',
      columns:
        '(' +
        'id_losses NUMBER PRIMARY KEY NOT NULL,' +
        'name TEXT NOT NULL,' +
        'place TEXT,' +
        'description TEXT,' +
        'imgs TEXT,' +
        'datetime NUMBER,' +
        'datetime_pretty TEXT' +
        ')',
      values: '(?,?,?,?,?,?,?)',
      mappedFunction: function (item: any) {
        return [
          item.id,
          item.name,
          item.place_f,
          item.description,
          JSON.stringify(item.imgarr),
          item.date_found !== '0000-00-00'
            ? moment(
                item.date_found + ' ' + item.date_found_time,
                'YYYY-MM-DD HH:mm:ss'
              ).valueOf()
            : null,
          this.formatDate(item.date_found, item.date_found_time)
        ];
      },
      formatDate(date: string, time: string) {
        if (date === '0000-00-00') {
          return null;
        } else {
          let datetime = moment(date, 'YYYY-MM-DD').format('D.M.YYYY');

          if (time !== '00:00:00') {
            datetime += ' ve ' + moment(time, 'HH:mm:ss').format('H:mm');
          }

          return datetime;
        }
      }
    }
  ]
};
