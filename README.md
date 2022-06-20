# ZaiForm
This is a form system, which is a simple way to create the form system by your own.

## Install

 1. Download/Clone this repository.
 2. Install the dependencies with `npm install`.
 3. Start ZaiForm with `npm start`.

## Configure
ZaiForm has lots of configuration options. You need to set up a `.env` file in the root directory of your project.

Option             | Description             | Default              | Available Values       | Required
------------------ | ----------------------- | -------------------- | ---------------------- | --------------
`PORT`             | Server Port             | `1287`               | `[1-65535]`            | No
`SANZIAUTH_APPID`  | SanZi Auth App ID       | Empty                | `[sanZi Auth App ID]`  | No
`SANZIAUTH_APPKEY` | SanZi Auth Secret       | Empty                | `[sanZi Auth Key]`     | No
`SMTP_TYPE`        | SMTP Type               | Empty                | `[smtp, gmail]`        | No
`SMTP_HOST`        | SMTP Host               | Empty                | `[smtp host]`          | Required if `SMTP_TYPE` is `smtp`
`SMTP_PORT`        | SMTP Port               | Empty                | `[smtp port]`          | Required if `SMTP_TYPE` is `smtp`
`SMTP_USER`        | SMTP User               | Empty                | `[smtp user]`          | Required if `SMTP_TYPE` is not empty
`SMTP_PASS`        | SMTP Password           | Empty                | `[smtp password]`      | Required if `SMTP_TYPE` is not empty
`SMTP_FROM`        | SMTP From               | Empty                | `[smtp from]`          | Required if `SMTP_TYPE` is not empty
`SMTP_SECURE`      | SMTP Using Secure       | Empty                | `[true, false]`        | Required if `SMTP_TYPE` is `smtp`