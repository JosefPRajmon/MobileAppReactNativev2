import { AppConfig, AppModules } from "../config/App.config";
import * as x2js from "react-native-xml2js";
import { DatabaseProvider } from "./DatabaseProvider";
import axios from "axios";

export async function updateData(moduleID: string) {
  const db: any = DatabaseProvider.getInstance();

  let promises = [];
  for (let table of AppModules[moduleID].config.tables) {
    promises.push(
      new Promise((resolve, reject) => {
        const url: string = table.url
          .replace("appID=", "appID=" + AppModules[moduleID]?.env?.appID)
          .replace("hkatIDs=", "hkatIDs=" + AppModules[moduleID]?.env?.hkatIDs);

        fetchData(url, table.dataType)
          .then((data: any) => {
            if (table.name === "contacts_jobs") {
              data = table.assignDepartments(data);
            }
            resolve(db.updateTable(table, data));
          })
          .catch(err => {
            console.error("Data failed", err);
            reject(err);
          });
      })
    );
  }

  return Promise.all(promises)
    .then(() => {
      return true;
    })
    .catch(err => {
      console.error("Update dat se nezdařil!!!", err);
      return false;
    });
}

async function fetchData(tableUrl: string, dataType: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = AppConfig.domainUrl + tableUrl;
      const response = await fetch(url);

      switch (dataType) {
        case "JSON":
          try {
            let responseJson = await response.json();
            resolve(responseJson);
          } catch (error) {
            console.error("JSON error: ", url, error);
            reject(error);
          }
          break;
        case "XML":
          if (response.status === 200 && response.ok) {
            let responseXml: string = await response.text();
            //console.log("fetchData XML", url, response);
            x2js.parseString(
              responseXml,
              {
                tagNameProcessors: [
                  (name: string) => {
                    return name === "media:content" ? "thumb" : name;
                  }
                ],
                explicitArray: false,
                mergeAttrs: true
              },
              (err: any, result: any) => {
                if (!err && result && result.rss.channel.item.length) {
                  resolve(result.rss.channel.item);
                } else {
                  console.error("fetchData parse XML failed: ", err);
                  reject(err);
                }
              }
            );
          } else {
            reject("XML Response fail: " + response);
          }
          break;
        default:
          reject("No XML or JSON");
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export const sendReport = (uri: string, data: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      /* dispatch({
                type: START_LOADING
            }); */

      const headers: any = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      };

      let success = false;

      const url: string = AppConfig.domainUrl + uri;

      let encodedForm: any = [];

      Object.entries(data).map(([key, value]: any) => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value);
        encodedForm.push(`${encodedKey}=${encodedValue}`);
      });

      encodedForm = encodedForm.join("&");

      const response = await axios(url, {
        method: "POST",
        headers: headers,
        data: encodedForm
      });

      if (response && response.data && response.data.status === "success") {
        success = true;
      }

      /* if (success) {
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        isError: false,
                        message: "Fotografie byla úspěšně uložena."
                    }
                });
            } else {
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        isError: true,
                        message: "Fotografii se nepodařilo uložit. Zkuste to znovu."
                    }
                });
            } */

      /* dispatch({
                type: STOP_LOADING
            }); */

      return success;
    } catch (error) {
      // console.log("updatePhotos err: ", error);
      return false;
    }
  };
};
