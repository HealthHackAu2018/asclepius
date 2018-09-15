
#define led_pin 2

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(9600);
  Serial2.begin(9600);
  
  pinMode(led_pin, OUTPUT);
  
  sendCommand("AT");
  sendCommand("AT+ROLE0");
  sendCommand("AT+UUID0xFFE0"); // returning ERR!
  sendCommand("AT+NAMEasclepius");
  //sendCommand("AT+HELP");   
  sendCommand("AT+VERSION");
}

// the loop function runs over and over again forever
void loop() {
  writeToBLE("Hello");
  Serial.println("Spoke to the BLE module");
  delay(4000);
}

void sendCommand(const char * command) {
  Serial.print("Command sent:");
  Serial.println(command);
  Serial2.println(command);

  unsigned int replyLength=100;
  char reply[replyLength+1];
  unsigned int readChars = 0;
  unsigned int readCharsTotal = 0;
  Serial2.setTimeout(1000);
  do{
    readChars = Serial2.readBytes(reply, replyLength); 
    readCharsTotal += readChars;
    reply[readChars] = 0;
    if(readChars>0) {
      Serial.print(reply);
    }
  } while (readChars>0);

  sprintf(reply, "Reply end, %d chars", readCharsTotal);
  Serial.println(reply);               
}


void writeToBLE(const char *str) {
  Serial.print("Writing :");
  Serial.println(str);
  Serial2.write(str, strlen(str));
}
