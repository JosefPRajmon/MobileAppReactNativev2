import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as ImageManipulator from "expo-image-manipulator";
import { View, Text, Button, Toast } from "native-base";
import { AppStyles, Colors, Metrics } from "../themes";
import { ScrollView } from "react-native-gesture-handler";
import DetailItem from "../components/detail/DetailItem";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { MainButton } from "../components/MainButton";
import FormInput from "../components/form/FormInput";
import { PICK_LOCATION_MODAL } from "../navigation/ScreenNames";
import { FlatGrid } from "react-native-super-grid";
import cuid from "cuid";
import { useDispatch } from "react-redux";
import { sendReport } from "../providers/BackendProvider";
import { ReportsConfig } from "../config/modules/Reports.config";
import { LoaderModal } from "../modals/LoaderModal";
import { translate } from "../services/translate.service";
import { ButtonMenu } from "../components/header/ButtonMenu";

export default function ReportsScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const locationChoices: any = [
    {
      label: "Žádná lokace",
      value: "noLocation",
      icon: "crosshairs-off"
    },
    {
      label: "Vaše aktuální lokace",
      value: "actualLocation",
      icon: "crosshairs-gps"
    },
    {
      label: "Lokace zvolená na mapě",
      value: "customLocation",
      icon: "crosshairs"
    }
  ];
  const photoOptions: any = {
    mediaType: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
    base64: false
  };
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const [locationChoice, setLocationChoice] = useState(locationChoices[0]);
  const [location, setLocation]: any = useState(false);
  const [uploading, setUploading]: any = useState(false);
  const [images, setImages] = useState<any>([]);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid }
  }: any = useForm({ mode: "onBlur" });
  const [cardWidth, setCardWidth] = useState<number>(
    Math.floor(Metrics.screenDims.width / 2 - Metrics.padding.normal * 2)
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const galleryPermissions =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (galleryPermissions.status !== "granted") {
          alert("Musíte povolit aplikaci použití kamery v nastavení.");
        }

        const cameraPermissions =
          await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPermissions.status !== "granted") {
          alert("Musíte povolit přístup do galerie v nastavení.");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Potřebujeme vaší polohu k zacílení hlášení!");
        return;
      }

      let gps: any = await Location.getCurrentPositionAsync({});
      if (gps?.coords) {
        setLocation(gps.coords);
        setLocationChoice(locationChoices[1]);
      }
    })();
  }, []);

  const onLayout = (e: any) => {
    const dim = Math.floor(
      Metrics.screenDims.width / 2 - Metrics.padding.normal * 2
    );
    setCardWidth(dim);
  };

  const handleOpenPickLocationModal = () => {
    navigation.navigate(PICK_LOCATION_MODAL, {
      onPickLocation: (gps: any) => {
        if (gps) {
          setLocation(gps);
          setLocationChoice(locationChoices[2]);
        } else if (location) {
          setLocation(location);
          setLocationChoice(locationChoices[1]);
        } else {
          setLocation(false);
          setLocationChoice(locationChoices[0]);
        }
      }
    });
  };

  const handleCapturePhoto = async () => {
    try {
      const result: any = await ImagePicker.launchCameraAsync(photoOptions);

      if (!result.canceled && result.uri) {
        addImage(result);
      } else {
        alert("Fotografii se nepodařilo načíst.");
      }
    } catch (e) {
      console.log("uiTakePhoto failed! Err: ", e);
      alert("Fotografii se nepodařilo načíst.");
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync(
        photoOptions
      );

      if (!result.canceled && result.uri) {
        addImage(result);
      } else {
        alert("Fotografii se nepodařilo načíst.");
      }
    } catch (e) {
      console.log("uiTakePhoto failed! Err: ", e);
      alert("Fotografii se nepodařilo načíst.");
    }
  };

  const addImage = async (image: any, maxWidth = 720, maxHeight = 720) => {
    try {
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      const manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: width, height: height } }],
        {
          compress: 0.6,
          base64: true,
          format: ImageManipulator.SaveFormat.JPEG
        }
      );

      setImages((images: any) => [...images, manipResult.base64]);
    } catch (error) {
      console.log("Resize and add photo failed! Err: ", error);
    }
  };

  const onSubmit = async (data: any) => {
    setUploading(true);

    const dataToSend: any = {
      image: images,
      nazev: data.title,
      jmeno: data.nameAndSurname,
      email: data.email,
      telefon: data.tel,
      text: data.description,
      lat: location.latitude,
      lng: location.longitude
    };

    const success: any = await dispatch(
      await sendReport(ReportsConfig.reportUrl, dataToSend)
    );

    if (success) {
      setValue("title", "");
      setValue("nameAndSurname", "");
      setValue("email", "");
      setValue("tel", "");
      setValue("description", "");
      setImages([]);

      Toast.show({
        text: "Hlášení se úspěšně odesláno!",
        type: "success",
        buttonText: "Ok",
        textStyle: AppStyles.toastTextStyle,
        duration: 3000
      });
    } else {
      Toast.show({
        text: "Hlášení se nepodařilo odeslat!",
        type: "danger",
        buttonText: "Ok",
        textStyle: AppStyles.toastTextStyle,
        duration: 3000
      });
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages((images: any) =>
      images.filter((img: any, i: number) => i !== index)
    );
  };

  const renderImage = ({ item, index }: any) => {
    const height = Math.floor((cardWidth / 4) * 3);

    return (
      <TouchableOpacity onPress={() => removeImage(index)} activeOpacity={0.7}>
        <View style={[styles.itemContainer, { width: cardWidth }]}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${item}` }}
            style={[styles.photo, { width: "100%", height: height }]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      scrollEnabled={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      enabled
      style={styles.keyboard}
    >
      <LoaderModal
        loading={uploading}
        text={translate.get("text-uploading-report")}
          />
          <ButtonMenu navigation={navigation}
          />
          <ScrollView scrollIndicatorInsets={{ right: 1 }}>
              <View>
        <View style={styles.container}>
          <Text style={AppStyles.detailTitle}>Zadání nového hlášení</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.text}>
              Vyplňte požadované údaje a hlášení odešlete. Hlášení se odešle ke
              zpracování a přidělení příslušnému zaměstnanci podle povahy
              požadavku. V případě, že nám na sebe zanecháte kontakt, budete
              informování o průběhu a způsobu řešení požadavku.
            </Text>
          </View>
          <DetailItem
            title={"Fotografie"}
            data="Vyberte alespoň jednu, ale maximálně pět fotografií souvisejících s Vaším hlášením."
          />
          {images.length <= 5 && (
            <View style={styles.buttonsContainer}>
              <Button
                style={[styles.button, { marginRight: Metrics.margin.tinny }]}
                onPress={handleCapturePhoto}
              >
                <Text style={styles.buttonTitle}>Vyfotit</Text>
              </Button>
              <Button
                style={[styles.button, { marginLeft: Metrics.margin.tinny }]}
                onPress={handleChoosePhoto}
              >
                <Text style={styles.buttonTitle}>Z galerie</Text>
              </Button>
            </View>
          )}
          <View onLayout={onLayout} style={styles.gridContainer}>
            <FlatGrid
              keyExtractor={() => cuid()}
              scrollIndicatorInsets={{ right: 1 }}
              itemDimension={cardWidth}
              data={images}
              style={styles.gridView}
              renderItem={renderImage}
            />
          </View>
          <DetailItem
            title={"Lokace požadavku"}
            data="Bude použita Vaše současná lokace zařízení, pokud není mimo vymezenou oblast nebo můžete požadovanou lokaci najít na mapě. Zadejte ji co nejpřesněji."
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.locationPickerButton,
              location && { borderColor: "green" }
            ]}
            onPress={handleOpenPickLocationModal}
          >
            <View style={styles.locationPickerTextContainer}>
              <Text style={styles.locationPickerText}>
                {locationChoice.label}
              </Text>
            </View>
            <View style={styles.locationPickerIconContainer}>
              <Icon
                style={styles.locationPickerIcon}
                size={Metrics.icon.normal}
                name={locationChoice.icon}
                color={Colors.listItemIcon}
              />
            </View>
          </TouchableOpacity>
          <DetailItem
            title={"Kontaktní údaje"}
            data="Vyplňte následující kontaktní údaje a popis Vašeho hlášení."
            containerStyle={{ marginBottom: Metrics.margin.normal }}
          />
          <Controller
            name="title"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Název je vyžadován"
              },
              minLength: {
                value: 2,
                message: "Málo znaků"
              },
              maxLength: {
                value: 32,
                message: "Moc znaků"
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInput
                value={value}
                placeholder="Název hlášení"
                keyboardType="default"
                onChangeText={(text: string) => onChange(text)}
                onBlur={onBlur}
                error={errors?.title}
                errorText={errors?.title?.message}
              />
            )}
          />
          <Controller
            name="nameAndSurname"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Jméno a příjmení je vyžadováno"
              },
              minLength: {
                value: 2,
                message: "Málo znaků"
              },
              maxLength: {
                value: 32,
                message: "Moc znaků"
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInput
                value={value}
                placeholder="Jméno a příjmení"
                keyboardType="default"
                onChangeText={(text: string) => onChange(text)}
                onBlur={onBlur}
                error={errors?.nameAndSurname}
                errorText={errors?.nameAndSurname?.message}
              />
            )}
          />
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Email je vyžadován"
              },
              pattern: {
                value: EMAIL_REGEX,
                message: "Špatný formát emailu"
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInput
                value={value}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(text: string) => onChange(text.trim())}
                onBlur={onBlur}
                error={errors?.email}
                errorText={errors?.email?.message}
              />
            )}
          />
          <Controller
            name="tel"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Telefon je vyžadovýn"
              },
              minLength: {
                value: 9,
                message: "Příliš krátké"
              },
              maxLength: {
                value: 16,
                message: "Příliš dlouhé"
              },
              pattern: {
                value: PHONE_REGEX,
                message: "Špatný formát telefonu"
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInput
                value={value}
                placeholder="Telefon"
                keyboardType="phone-pad"
                onChangeText={(text: string) => onChange(text.trim())}
                onBlur={onBlur}
                error={errors?.tel}
                errorText={errors?.tel?.message}
              />
            )}
          />
          <Controller
            name="description"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Popis nesmý být prázdný"
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInput
                value={value}
                placeholder="Popis hlášení"
                keyboardType="default"
                onChangeText={(text: string) => onChange(text)}
                onBlur={onBlur}
                error={errors?.description}
                errorText={errors?.description?.message}
                multiline={true}
              />
            )}
          />
          <MainButton
            text={"Odeslat hlášení"}
            iconType="MaterialCommunityIcons"
            iconName="send"
            containerStyle={{ paddingTop: 0 }}
            disabled={!isValid || !location || uploading}
            onButtonPress={handleSubmit(onSubmit)}
          />
                  </View>
                  <View style={{ height:50 }}></View>
              </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1
  },
  container: {
    flex: 1,
    width: "90%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: Metrics.padding.normal,
    backgroundColor: Colors.appBackround,
      paddingBottom: Metrics.padding.big,
      margin: "5%",
      borderRadius:10
  },
  descriptionContainer: {
    marginTop: Metrics.padding.small
  },
  text: {
    fontSize: Metrics.font.text,
    color: Colors.text.defaultText
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Metrics.padding.normal
  },
  button: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.mainButton.background,
    padding: Metrics.padding.tinny
  },
  buttonTitle: {
    color: Colors.mainButton.text,
    fontSize: Metrics.font.title
  },
  locationPickerButton: {
    flexDirection: "row",
    alignContent: "space-between",
    textAlign: "center",
    padding: Metrics.padding.small,
    borderWidth: 0.5,
    borderColor: Colors.listItemSeparator,
    marginTop: Metrics.padding.small,
    borderRadius: Metrics.radius.small
  },
  locationPickerTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlignVertical: "center",
    color: Colors.text.defaultText
  },
  locationPickerText: {
    flex: 1,
    alignSelf: "center",
    alignContent: "center",
    textAlignVertical: "center",
    fontSize: Metrics.font.text,
    fontWeight: "bold",
    color: Colors.text.defaultText
  },
  locationPickerIconContainer: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
  },
  locationPickerIcon: {
    paddingLeft: Metrics.padding.small
  },
  // Form
  formItem: {
    borderRadius: Metrics.radius.small,
    marginVertical: Metrics.margin.normal,
    height: 36
  },
  inputContainer: {
    width: "100%"
  },
  formInput: {
    fontSize: Metrics.font.text
  },
  errorText: {
    color: "red"
  },
  gridContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 0,
    backgroundColor: Colors.appBackround,
    paddingBottom: 0,
    marginTop: Metrics.margin.normal
  },
  gridView: {},
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Metrics.radius.small
  },
  photo: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: Metrics.radius.small
  }
});
