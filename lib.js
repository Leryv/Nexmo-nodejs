import Vonage from "@vonage/server-sdk";
import "dotenv/config";

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const sender = process.env.VONAGE_VIRTUAL_NUMBER;

export const sendSms = (recipient, message) => {
  return new Promise((resolve, reject) => {
    console.log("Initial");
    vonage.message.sendSms(sender, recipient, message, (err, responseData) => {
      if (err) {
        console.log(err);
        reject(err.message);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.dir(responseData);
          resolve(responseData);
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
          reject(`${responseData.messages[0]["error-text"]}`);
        }
      }
    });
  });
};
