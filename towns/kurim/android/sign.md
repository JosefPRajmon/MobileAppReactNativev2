# Android Keystore Credentials

Podpis pro Google Play

## Credential Values

- Android keystore password: KurimK3y/
- Android key alias: release
- Android key password: KurimK3y/

## Encrypt for Google Play Console

- $ java -jar ./scripts/pepk.jar --keystore=./towns/kurim/android/kurim_release.keystore --alias=release --output=./towns/kurim/android/kurim_encrypted_private_key --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a
