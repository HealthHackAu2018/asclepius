# asclepius


## Exploring the BT module:
```
Command sent:AT+HELP
*******************************************************************
* Command             Description
*----------------------------------------------------------------
* AT                  Check if the command terminal work normally
* AT+DEFAULT          Restore factory default

* AT+ROLE             Get/Set current role.
* AT+DISC             Disconnect connection
* AT+ADVEN            Broadcast switch
* AT+ADVI             Broadcast interval
* AT+NINTERVAL        Connection interval
* AT+POWE             Get/Set RF transmit power
* AT+NAME             Get/Set local device name
* AT+LADDR            Get local bluetooth address
* AT+VERSION          Get firmware, bluetooth, HCI and LMP version
* AT+TYPE             Binding and pairing settings
* AT+PIN              Get/Set pin code for pairing
* AT+UUID             Get/Set system SERVER_UUID .
* AT+CHAR             Get/Set system CHAR_UUID .
* AT+INQ              Search from device
* AT+RSLV             Read the scan list MAC address
* AT+CONN             Connected scan list device
* AT+CONA             Connection specified MAC
* AT+BAND             Binding from device
* AT+CLRBAND          Cancel binding
* AT+GETDCN           Number of scanned list devices
* AT+SLEEP            Sleep mode
* AT+HELP             List all the commands
* ---------------------------------------------------------------
******************************************************************
-Reply end, 1874 chars
```

```
Command sent:AT+VERSION
MLT-BT05-V4.4
Reply end, 15 chars

```
# Building the app

```
npm install
pod setup
cd ios && pod install
open ios/asclepius.xcworkspace/
	go to xcode settings -> accounts and add your apple ID account.  Click
	"manage certificates" and add a dev cert
go to project -> general -> bundle identifier.   Change it to one based on your identity
	under signing, select your identity

start the expo app, in 'mobile' dir
	exp start --tunnel

Load the app on your phone
	click the "build and run" button in xcode

start the app on your phone
	it may take 10-30 secs to show anything
	double tap the yellow errors and select 'dismiss all'	
```

[These instructions](https://blog.expo.io/so-you-want-to-build-a-bluetooth-app-with-react-native-and-expo-6ea6a31a151d) may help if you run into trouble
	
