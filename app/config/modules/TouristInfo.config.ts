export const TouristInfoConfig: any = {
    moduleID: "touristInfo",
    title: "screen-title-interests",
    updateable: true,
    notificationEnabled: false,
    icon: {
        name: "interests"
    },
    tables: [
        {
            name: "tourist_info",
            url: "mobile/json.php?akce=mmvm_export_rs&id=130713&showData=popis;text;gal",
            dataType: 'JSON',
            columns: '(' +
                'img_ids TEXT NOT NULL' +
                'text TEXT NOT NULL,' +
                'description TEXT NOT NULL' +
                ')',
            values: '(?,?,?)',
            mappedFunction: function (o: any) {
                return {
                    img_ids: JSON.stringify(o.gal),
                    text: o.text,
                    description: o.popis
                };
            }
        }
    ]
}