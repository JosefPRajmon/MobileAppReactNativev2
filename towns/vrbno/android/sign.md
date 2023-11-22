# Android Keystore Credentials

These credentials are used in conjunction with your Android keystore file to sign your app for distribution.

## Credential Values

- Android keystore password: 51787d337de5394ed056e581e5c4ed0c
- Android key alias: 3a9e327bf16580c77f4e57d195962c40
- Android key password: 520a3daf101e159ad0bf8e8655b15537

      java -jar ./scripts/pepk.jar --keystore=./towns/vrbno/android/vrbno_keystore.jks --alias=3a9e327bf16580c77f4e57d195962c40 --output=./towns/vrbno/android/vrbno_encrypted_private_key --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a
