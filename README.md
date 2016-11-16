# g0v@nyc SMS bot

## Function
This bot serves as a Public Announcement System during the 2 day hackathon and team communication unit for the hackathon Rapid Response Team. 

### Set up
You need a Twilio Account with a SMS capable number.
Please visit http://twilio.com for Docs.

### Public Annoucement
Put the main host's phone number in `"MAIN-ADMIN-PHONE-NUMBER (without +1)"` in line 18 of `index.js`
So whenever the main host want to make a public announcement, she will text:
```
To all: this is a public announcement
```

The system will then text all participants in `attendeeContacts.json`

### Rapid Response Team
Put all Rapid Response Team members' contacts in `adminContacts.json`
All messages texted to the registered Twilio number will go to all team members. The team members can also communicate with each other by texting the number. 
