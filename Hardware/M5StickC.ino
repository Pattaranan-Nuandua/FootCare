#include <M5StickCPlus.h>
#include <Wire.h>
#include <Adafruit_ADS1X15.h>
#include <BLE2902.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define SERVICE_UUID "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"
#define CHARACTERISTIC_UUID "34e6274d-6f78-45db-8620-27c547d6ac47"

///////////new//////////
#define CHARACTERISTIC_BLE "ae41c84a-2fc1-4b66-8531-02e76eb67315"
////////////////////////

#define CHARACTERISTIC_UUID_TX "673edd34-caf8-41f6-8605-715a69b2a943"
#define CHARACTERISTIC_UUID_RX "746d8ce0-87a5-4810-9d67-c47fd233304e"
#define TxM5STICK "03e88115-695e-4f42-8933-f13c681b312a"

BLEServer *pServer;
BLEService *pService;
BLECharacteristic * pTxCharacteristic;

/////////////new/////////////////
BLECharacteristic * ADCBLExCharacteristic;
////////////////////////////////

BLECharacteristic * pRxCharacteristic;
BLECharacteristic * read_BT;
BLECharacteristic * write_BT;

unsigned int timePeriod1 = 10;
unsigned long last_time1 = 0;

int FSRValue = 0;
int FSRData = 0;

String FSRVal_Str = "";
String fsrReal_Str = "";

// ////Count step////
// int step = 0;
// float total = 0;
// int count = 0;
// float avg = 1.1;
// float width = avg / 10;
// boolean state = false;
// boolean old_state = false;



//////NEW//////
int FSRData11 = 0;
int FSRData12 = 0;
int FSRData13 = 0;
int FSRData14 = 0;
int FSRData21 = 0;
int FSRData22 = 0;
int FSRData23 = 0;
int FSRData24 = 0;
int FSRData31 = 0;
int FSRData32 = 0;
int FSRData33 = 0;
int FSRData34 = 0;

int FSRValue11 = 0;
int FSRValue12 = 0;
int FSRValue13 = 0;
int FSRValue14 = 0;
int FSRValue21 = 0;
int FSRValue22 = 0;
int FSRValue23 = 0;
int FSRValue24 = 0;
int FSRValue31 = 0;
int FSRValue32 = 0;
int FSRValue33 = 0;
int FSRValue34 = 0;

String FSRVal_Str11 = "";
String FSRVal_Str12 = "";
String FSRVal_Str13 = "";
String FSRVal_Str14 = "";
String FSRVal_Str21 = "";
String FSRVal_Str22 = "";
String FSRVal_Str23 = "";
String FSRVal_Str24 = "";
String FSRVal_Str31 = "";
String FSRVal_Str32 = "";
String FSRVal_Str33 = "";
String FSRVal_Str34 = "";

String fsrReal_Str11 = "";
String fsrReal_Str12 = "";
String fsrReal_Str13 = "";
String fsrReal_Str14 = "";
String fsrReal_Str21 = "";
String fsrReal_Str22 = "";
String fsrReal_Str23 = "";
String fsrReal_Str24 = "";
String fsrReal_Str31 = "";
String fsrReal_Str32 = "";
String fsrReal_Str33 = "";
String fsrReal_Str34 = "";
//////////////


#define TCAADDR 0x70
#define I2C_ADDRESS_1 0x48
#define I2C_ADDRESS_2 0x49

Adafruit_ADS1115 ads1;
Adafruit_ADS1115 ads2;
Adafruit_ADS1115 ads3;

//ClosedCube_TCA9548A tca = ClosedCube_TCA9548A();
bool deviceConnected = false;
bool oldDeviceConnected = false;

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    }
    void onDisconnect(BLEServer* Server) {
      deviceConnected = false;
    }
};

void IRAM_ATTR FSRADC() {
  if (millis() - last_time1 > timePeriod1) {
    last_time1 = millis();
    //FSRValue = ads1.readADC_SingleEnded(34);
    //FSRVal_Str = String(FSRValue, DEC);
    //FSRData = FSRValue;

    /////////NEW///////////
    //////ADS1/////////////
    TCA9548A(4);
    FSRValue11 = ads1.readADC_SingleEnded(0);
    FSRVal_Str11 = String(FSRValue11, DEC);
    FSRData11 = FSRValue11;

    FSRValue12 = ads1.readADC_SingleEnded(1);
    FSRVal_Str12 = String(FSRValue12, DEC);
    FSRData12 = FSRValue12;

    FSRValue13 = ads1.readADC_SingleEnded(2);
    FSRVal_Str13 = String(FSRValue13, DEC);
    FSRData13 = FSRValue13;

    FSRValue14 = ads1.readADC_SingleEnded(3);
    FSRVal_Str14 = String(FSRValue14, DEC);
    FSRData14 = FSRValue14;
    //////ADS2/////////////
    TCA9548A(2);
    FSRValue21 = ads2.readADC_SingleEnded(0);
    FSRVal_Str21 = String(FSRValue21, DEC);
    FSRData21 = FSRValue21;

    FSRValue22 = ads2.readADC_SingleEnded(1);
    FSRVal_Str22 = String(FSRValue22, DEC);
    FSRData22 = FSRValue22;

    FSRValue23 = ads2.readADC_SingleEnded(2);
    FSRVal_Str23 = String(FSRValue23, DEC);
    FSRData23 = FSRValue23;

    FSRValue24 = ads2.readADC_SingleEnded(3);
    FSRVal_Str24 = String(FSRValue24, DEC);
    FSRData24 = FSRValue24;
    //////ADS3/////////////
    TCA9548A(3);
    FSRValue31 = ads3.readADC_SingleEnded(0);
    FSRVal_Str31 = String(FSRValue31, DEC);
    FSRData31 = FSRValue31;

    FSRValue32 = ads3.readADC_SingleEnded(1);
    FSRVal_Str32 = String(FSRValue32, DEC);
    FSRData32 = FSRValue32;

    FSRValue33 = ads3.readADC_SingleEnded(2);
    FSRVal_Str33 = String(FSRValue33, DEC);
    FSRData33 = FSRValue33;

    FSRValue34 = ads3.readADC_SingleEnded(3);
    FSRVal_Str34 = String(FSRValue34, DEC);
    FSRData34 = FSRValue34;
    //////////////////////
    //delay(1000);
  }
}

void TCA9548A(uint8_t bus) {
  Wire.beginTransmission(0x70);  // TCA9548A address
  Wire.write(1 << bus);          // send byte to select bus
  Wire.endTransmission();
  Serial.print(bus);
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  //delay(1000);
  M5.begin();
 
  M5.Lcd.setRotation(3);
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(60, 0, 2);
  //M5.Lcd.println("kernpuimui");
  M5.Lcd.println("Test I2C");
  ads1.setGain(GAIN_TWOTHIRDS);
  ads2.setGain(GAIN_TWOTHIRDS);
  ads3.setGain(GAIN_TWOTHIRDS);
  //=====Bluetooth========
  Serial.println("Starting BLE work!");
  BLEDevice::init("M5StickC-Plus");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  //Create BLE Server
  pService = pServer->createService(SERVICE_UUID);

  pTxCharacteristic = pService->createCharacteristic(
                        CHARACTERISTIC_UUID,
                        BLECharacteristic::PROPERTY_NOTIFY |
                        BLECharacteristic::PROPERTY_READ
                      );
  pTxCharacteristic->addDescriptor(new BLE2902());
  ///////////NEW/////////
  ADCBLExCharacteristic = pService->createCharacteristic(
                            CHARACTERISTIC_BLE,
                            BLECharacteristic::PROPERTY_NOTIFY |
                            BLECharacteristic::PROPERTY_READ
                          );
  ADCBLExCharacteristic->addDescriptor(new BLE2902());
  ///////////////////////
  read_BT = pService->createCharacteristic(
              CHARACTERISTIC_UUID_RX,
              BLECharacteristic::PROPERTY_NOTIFY |
              BLECharacteristic::PROPERTY_READ
            );
  read_BT->addDescriptor(new BLE2902());

  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");

  TCA9548A(2);
  //ads1.begin(0x48);
  if (!ads1.begin(I2C_ADDRESS_1)) {
    Serial.println("Fail to initialize ADS1.");
  }

  TCA9548A(4);
  //ads2.begin(0x49);
  if (!ads2.begin(I2C_ADDRESS_1)) {
    Serial.println("Fail to initialize ADS2.");
  }

  TCA9548A(3);
  if (!ads3.begin(I2C_ADDRESS_1)) {
    Serial.println("Fail to initialize ADS3.");
  }

}
void loop() {

  if (deviceConnected) {
    //String data = "Hello from M5StickC-Plus";
    //fsrReal_Str = String(FSRData);
    //char arrStr[100];
    //fsrReal_Str.toCharArray(arrStr, fsrReal_Str.length() + 1);
    //pTxCharacteristic->setValue(arrStr);
    //pTxCharacteristic->notify();
    //Serial.println("Connect");

    //Step Count//
    
    ////////////////NEW/////////////////
    fsrReal_Str11 = String(FSRData11);
    char arrStr11[100];
    fsrReal_Str11.toCharArray(arrStr11, fsrReal_Str11.length() + 1);

    fsrReal_Str12 = String(FSRData12);
    char arrStr12[100];
    fsrReal_Str12.toCharArray(arrStr12, fsrReal_Str12.length() + 1);

    fsrReal_Str13 = String(FSRData13);
    char arrStr13[100];
    fsrReal_Str13.toCharArray(arrStr13, fsrReal_Str13.length() + 1);

    fsrReal_Str14 = String(FSRData14);
    char arrStr14[100];
    fsrReal_Str14.toCharArray(arrStr14, fsrReal_Str14.length() + 1);

    fsrReal_Str21 = String(FSRData21);
    char arrStr21[100];
    fsrReal_Str21.toCharArray(arrStr21, fsrReal_Str21.length() + 1);

    fsrReal_Str22 = String(FSRData22);
    char arrStr22[100];
    fsrReal_Str22.toCharArray(arrStr22, fsrReal_Str22.length() + 1);

    fsrReal_Str23 = String(FSRData23);
    char arrStr23[100];
    fsrReal_Str23.toCharArray(arrStr23, fsrReal_Str23.length() + 1);

    fsrReal_Str24 = String(FSRData24);
    char arrStr24[100];
    fsrReal_Str24.toCharArray(arrStr24, fsrReal_Str24.length() + 1);

    fsrReal_Str31 = String(FSRData31);
    char arrStr31[100];
    fsrReal_Str31.toCharArray(arrStr31, fsrReal_Str31.length() + 1);

    fsrReal_Str32 = String(FSRData32);
    char arrStr32[100];
    fsrReal_Str32.toCharArray(arrStr32, fsrReal_Str32.length() + 1);

    fsrReal_Str33 = String(FSRData33);
    char arrStr33[100];
    fsrReal_Str33.toCharArray(arrStr33, fsrReal_Str33.length() + 1);

    fsrReal_Str34 = String(FSRData34);
    char arrStr34[100];
    fsrReal_Str34.toCharArray(arrStr34, fsrReal_Str34.length() + 1);

    char buffer[500];
    sprintf(buffer,
            "{\"ADC11\": \"%s\", \"ADC12\": \"%s\", \"ADC13\": \"%s\", \"ADC14\": \"%s\", \"ADC21\": \"%s\", \"ADC22\": \"%s\", \"ADC23\": \"%s\", \"ADC24\": \"%s\", \"ADC31\": \"%s\", \"ADC32\": \"%s\", \"ADC33\": \"%s\", \"ADC34\": \"%s\"}",
            arrStr11, arrStr12, arrStr13, arrStr14, arrStr21, arrStr22, arrStr23, arrStr24, arrStr31, arrStr32, arrStr33, arrStr34);
    ADCBLExCharacteristic->setValue(buffer);
    ADCBLExCharacteristic->notify();
    Serial.println(buffer);
    //Serial.println(buffer);
    ////////////////////////////////////////////////
  }
  if (!deviceConnected && oldDeviceConnected) {
    pServer->startAdvertising();
    Serial.println("Start advertising");
    oldDeviceConnected = deviceConnected;
    Serial.println("Not Connect");
    //M5.Lcd.println("No Connected");
  }
  if (deviceConnected && !oldDeviceConnected) {
    oldDeviceConnected = deviceConnected;
  }
  FSRADC();
  //CountStep();
  
  //int16_t ADC11, ADC12, ADC13, ADC14, ADC21, ADC22, ADC23, ADC24, ADC31, ADC32, ADC33, ADC34;
  
  TCA9548A(2);
  Serial.println("ADS1115 set1");
  FSRValue11 = ads1.readADC_SingleEnded(0);
  FSRValue12 = ads1.readADC_SingleEnded(1);
  FSRValue13 = ads1.readADC_SingleEnded(2);
  FSRValue14 = ads1.readADC_SingleEnded(3);
  Serial.print("ADC11: "); Serial.println(FSRValue11);
  Serial.print("ADC12: "); Serial.println(FSRValue12);
  Serial.print("ADC13: "); Serial.println(FSRValue13);
  Serial.print("ADC14: "); Serial.println(FSRValue14);

  //=========ADS1115 set2======================

  TCA9548A(4);
  Serial.println("ADS1115 set2");
  //ADC21 = ads1.readADC_SingleEnded(0);
  //Serial.print("ADC21: ");Serial.println(ADC21);
  FSRValue21 = ads2.readADC_SingleEnded(0);
  FSRValue22 = ads2.readADC_SingleEnded(1);
  FSRValue23 = ads2.readADC_SingleEnded(2);
  FSRValue24 = ads2.readADC_SingleEnded(3);
  Serial.print("ADC21: "); Serial.println(FSRValue21);
  Serial.print("ADC22: "); Serial.println(FSRValue22);
  Serial.print("ADC23: "); Serial.println(FSRValue23);
  Serial.print("ADC24: "); Serial.println(FSRValue24);

  //=========ADS1115 set3======================

  TCA9548A(3);
  Serial.println("ADS1115 set3");
  //ADC21 = ads1.readADC_SingleEnded(0);
  //Serial.print("ADC21: ");Serial.println(ADC21);
  FSRValue31 = ads3.readADC_SingleEnded(0);
  FSRValue32 = ads3.readADC_SingleEnded(1);
  FSRValue33 = ads3.readADC_SingleEnded(2);
  FSRValue34 = ads3.readADC_SingleEnded(3);
  Serial.print("ADC31: "); Serial.println(FSRValue31);
  Serial.print("ADC32: "); Serial.println(FSRValue32);
  Serial.print("ADC33: "); Serial.println(FSRValue33);
  Serial.print("ADC34: "); Serial.println(FSRValue34);


  delay(1000);
}
