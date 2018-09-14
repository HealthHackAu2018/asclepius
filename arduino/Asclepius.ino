
#define led_pin 2

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(9600);
  Serial2.begin(9600);
  
  pinMode(led_pin, OUTPUT);
  
  sendCommand("AT");
  sendCommand("AT+ROLE0");
  sendCommand("AT+UUID0xFFE0");
  sendCommand("AT+NAMEasclepius");
}

// the loop function runs over and over again forever
void loop() {
  writeToBLE("Hello");
  Serial.write("Spoke to the BLE module\r\n");
  delay(4000);
}

void sendCommand(const char * command) {
  Serial.print("Command send :");
  Serial.println(command);
  Serial2.println(command);
  //wait some time
  delay(100);

  char reply[100];
  int i = 0;
  while (Serial2.available()) {
    reply[i] = Serial2.read();
    i += 1;
  }
  //end the string
  reply[i] = '\0';
  Serial.print(reply);
  Serial.println("Reply end");                 
  delay(50);
}


void writeToBLE(const char *value) {
  Serial.print("Writing :");
  Serial.println(value);
  Serial2.write(value, strlen(value));
}
