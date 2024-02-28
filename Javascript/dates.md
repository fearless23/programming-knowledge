## Date in javascript 

### Dates in javascript can be little weird

## First, get used to Timezone and UTC standards

## new Date in javascript
- new Date(input) uses local machine timezone

- input="2024-02-06T14:00:00" -- local date 6 feb 2024 and local time is 2 PM
- input="2024-02-06T14:00:00Z" (ISO8601 UTC Timestamp)
  - local date and time adjusted according to difference in UTC timezone and local timezone
  - if current timezone is delhi date will be same, time will be 5h30min ahead
- input="2024-02-06T14:00:00+06:30" -- (ISO8601 timestamp with some timezone)
  - local date and time adjusted according to difference in +06:30 timezone and local timezone
  - if current timezone is delhi date will be same, time will be 1 hour behind
- similarly, any other input will have date,time, timezone in some format which will be 
  stored in new Date() according to local

So, ultimately new Date(input) stores date, time and current timezone adjusted based on input provided

All methods on new Date() are then work on top of information stored

### toISOString method on new date (current machine = IST timezone)
- input=2024-02-06T14:00:00 and toISOString():  2024-02-06T08:30:00.000Z
  - since, 2 pm in local time so, -5h30min in UTC
- input="2024-02-06T14:00:00Z" (ISO8601 UTC Timestamp)
  - local date-time will be 2024-02-06, 19:30:00
  - when toISOString called it will be back to original 2024-02-06, 14:00:00 => 2024-02-06T14:00:00Z
- input="2024-02-06T14:00:00+06:30" -- (ISO8601 timestamp with some timezone)
  - local date and time; 2024-02-06, 13:00:00
  - - when toISOString called it will be -5H30M thus 2024-02-06, 07:30:00 => 2024-02-06T07:30:00Z
- Similarly, other methods like toLocalDateString, toUTCString uses information stored

### get parts
- getDay: returns day of given date object
- getUtcDay: convert date to UTC first, then get the day


### timezone
```js
const date = new Date(input)
const date-time = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
```
// given some date (date,time,localTimezone), convert it to date-time of other timezone

starting from a date-time in utc -> new Date -> date-time in some timezone

```js
const utc_timestamp = "2024-02-07T14:00:00.000Z";
const a = new Date(utc_timestamp).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
//     Asia/Kolkata:: it will be 7:30PM on 7 Feb 2024 => data stored in date =:: date=7 feb 2024, time 7:30pm timezone=local
const b = new Date(utc_timestamp).toLocaleString("en-US", { timeZone: "Australia/Sydney" });
// Australia/Sydney:: it will be 1:00AM on 8 Feb 2024 => data stored in date =:: date=8 feb 2024, time 1:00am timezone=local
```

### from a given date-time and string timezone ??