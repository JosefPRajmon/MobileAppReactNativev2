import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppStyles, Colors, Metrics } from '../../themes';

export function SumperkGDPR(props: any) {
    const { iconName, iconType, onPress } = props;

    return (
        <View>
            <View style={styles.title}>
                <Text style={AppStyles.detailItemTitle}>Informace o zpracování osobních údajů</Text>
            </View>
            <Text style={styles.text}>{"Správcem osobních údajů zpracovávaných v aplikaci Šumperk v mobilu je Město Šumperk, se sídlem náměstí Míru 364/1, 787 01 Šumperk, IČO: 00303461."}</Text>
            <Text style={styles.text}>{"Rozsah zpracování je závislý na službě, kterou se v rámci aplikace rozhodnete využívat."}</Text>
            <Text style={styles.text}>{"V modulu Rezervace na úřad jsou zpracovávány osobní údaje žadatele o rezervaci v rozsahu: jméno, příjmení a číslo mobilního telefonu. Tyto údaje jsou nezbytné k provedení termínu rezervace na městském úřadu a k zaslání oznámení o úspěšně provedené rezervaci včetně autorizačního kódu nebo k zaslání důležitých sdělení (např. neplánované výluky v činnosti městského úřadu apod.) Vaše osobní údaje budou zpracovávány pouze po dobu trvání rezervace, poté budou vymazány."}</Text>
            <Text style={styles.text}>{"Právním základem zpracování osobních údajů je plnění smlouvy (žádosti o rezervaci) ve smyslu čl. 6 odst. 1 písm. b) GDPR."}</Text>
            <Text style={styles.text}>{"V modulu Požadavky občanů jsou zpracovávány osobní údaje oznamující osoby v rozsahu: jméno, příjmení, e-mail a/nebo číslo mobilního telefonu, geolokační údaj (údaj o Vámi navštíveném místě, které souvisí s předmětem Vámi zasílaného hlášení) a další případné údaje, které sami uvedete v textu svého hlášení úřadu. Tyto údaje jsou nezbytné pro vyhodnocení a zpracování zaslaného oznámení. Kontaktní údaj slouží výhradně pro možnost případné komunikace pracovníka odpovědného za řešení Vašeho oznámení s Vámi. Osobní údaje budou zpracovávány po dobu řešení Vašeho hlášení, a dále po dobu 1 roku od jeho ukončení, poté budou vymazány."}</Text>
            <Text style={styles.text}>{"Právním základem zpracování osobních údajů je plnění smlouvy (zaslání hlášení má povahu žádosti o odstranění Vámi oznámeného nežádoucího stavu) ve smyslu čl.  6 odst. 1 písm. b) GDPR"}</Text>
            <Text style={styles.text}>{"V modulu e-Strážník jsou zpracovávány pouze kontaktní údaje (email a/nebo číslo mobilního telefonu) oznamující osoby, pokud je sama dobrovolně uvede. V rámci zasílaného oznámení mohou být zpracovávány další osobní údaje uvedené oznamovatelem, ať již se týkají jeho samého nebo jiné oznámením dotčené osoby. Pokud tyto údaje uvedete, budou zpracovávány výhradně za účelem prověření Vámi uvedeného oznámení. Kontaktní údaj bude využit pro možnost případné komunikace odpovědného strážníka městské policie s Vámi. Vaše osobní údaje budou zpracovávány po dobu řešení Vašeho hlášení, a dále po dobu 1 roku od jeho podání, poté budou z modulu vymazány."}</Text>
            <Text style={styles.text}>{"Příjemcem osobních a případně dalších v zaslaném oznámení uvedených údajů je Městská policie Šumperk, která je bude zpracovávat dle zákona č. 553/1991 Sb., o obecní policii, s dobou uchování max 3 roky. Právním základem zpracování osobních údajů je v tomto případě výkon veřejné moci ve smyslu čl. 6 odst. 1 písm. e) GDPR."}</Text>
            <Text style={styles.text}>{"Osobní údaje uživatelů aplikace Šumperk v mobilu nebudou předávány třetím osobám. Zpracovatelem osobních údajů v této aplikaci je společnost as4u.cz, s.r.o., se sídlem Na dlouhém lánu 19/3, 160 00 Praha 6 – Vokovice, IČO: 28884035, která pro město tuto provoz mobilní aplikace zajišťuje. S touto společností uzavřelo Město Šumperk smlouvu o zpracování osobních údajů, která poskytuje zpracovávaným datům takovou míru jejich zabezpečení, jako by je zpracovávalo město samo."}</Text>
            <Text style={styles.text}>{"Informace o Vašich právech, která v souvislosti se zpracováním vašich osobních údajů máte a o způsobech jejich uplatnění, naleznete v dokumentu Informace o zpracování osobních údajů, zveřejněném na internetových stránkách www.sumperk.cz."}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.detailItemBorder,
        marginTop: Metrics.margin.big
    },
    text: {
        fontSize: Metrics.font.text,
        color: Colors.text.defaultText,
        marginTop: 12,
    }
});
