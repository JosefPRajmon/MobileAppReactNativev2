import moment from 'moment';

export const OnSiteConfig: any = {
    moduleID: "onSite",
    title: "screen-title-onsite",
    updateable: true,
    notificationEnabled: true,
    dataType: "XML",
    tables: [
        {
            name: "on_site",
            url: "redakce/clanky.rss.php",
            dataType: 'XML',
            columns: '(' +
                'id_news NUMBER PRIMARY KEY NOT NULL,' +
                'title TEXT NOT NULL,' +
                'description TEXT,' +
                'link TEXT,' +
                'pub_date NUMBER NOT NULL,' +
                'thumb NUMBER' +
                ')',
            values: '(?,?,?,?,?,?)',
            mappedFunction: function (item: any) {
                let guidArray = item.guid._.split(" ");
                let mapped = [
                    guidArray[guidArray.length - 1],
                    item.title,
                    item.description,
                    item.link ? item.link : null,
                    moment(item.pubDate).valueOf(),
                    item.thumb ? item.thumb.url : null
                ];
                return mapped;
            }
        }
    ],
    icon: {
        name: "on-site"
    },
    autoUpdateTime: 2 * 60 * 60 * 1000
}