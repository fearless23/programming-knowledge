# Standards

## Date & Time
ISO 8601 is the standard for date and time

Date: 2023-07-10 (YYYY-MM-DD)
UTC Timestamp:                   2023‐07‐10T04:25:46Z (YYYY-MM-DDTHH:MM:SSZ)
UTC Timestamp with milliseconds: 2023-07-10T06:21:28.921Z
Timezone Timestamp:              2023‐07‐09T21:25:46+07:00
Timestamp without timezone:      2023‐07‐09T21:25:46 (i.e local time)

In your code & database, always use `UTC Timestamp with milliseconds`.

## Phone numbers
E164 is the standard used for phone number, this is not widely used but still quite useful and popular (AWS Cognito uses this)