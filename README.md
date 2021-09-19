# What does this tool solve?

## 1. Auto get and save tenant JWT token.
This tool will auto login to TB. Users don't need to get tokens by themselves, and also to save the token to `output/JWTToken.txt`.
If get JWT token error, this program will try to create a new tenant account to get a new JWT token.

## 2. Create virtual device to TB
This tool will create device to TB.

After create virtual device, you can send mock data or subscribe TB RPC topic. 

## 3. Subscribe TB RPC topic
You can use this tool to observe how TB RPC work.

If you set virtual device subscribe TB RPC topic. Virtual device will respond with a message to the server when receiving any server-side RPC request.

You can get more information as TB document.
https://thingsboard.io/docs/user-guide/rpc/

## 4. Save program output
After this tool execute for a while. Program will save output to json file.

You can run this tool for a long time and keep recording the output results, so you don’t have to worry about program interruption.

## 5. Send RPC to your device
You can send mock RPC to your device. For more details, see [Send RPC to single device](#SendRPC).


# Before use this tool
By default, this tool will auto login `admin account` and then get tenant JWT token. Admin account is TB default account as follow.
```
sysadmin@thingsboard.org
sysadmin
``` 

# How to use

## 1. Install package
```
npm i
```

## 2. Create .env file as follow
```
HOST= TB_server_host
PORT= TB_server_port
NUMBER_OF_DEVICES= TB_device_counts
DEVICE_NAME= TB_device_name
DEVICE_TYPE= TB_device_type
DEVICE_LABEL= TB_device_label
MQTT_PORT= MQTT_port
PUBLISH_FREQUENCY= MQTT_publish_data_frequency
CONNECT_DELAY= MQTT_connect_delay
TEST_TIME= MQTT_publish_data_times
SEND_MOCK_DATA=true
SUBSCRIBE_RPC=true
SAVE_OUTPUT_FREQUENCY= save_output_every_some_seconds
SAVE_LOG=true
```

## 3.Init folder

### Run init script. 

When script finish, you can see `output` and `config` folder has created.

```
npm run init
```

## 4.Add & Remove device

### Run add device script. 

```
npm run add-device
```

### Run delete all device script:

```
npm run remove-device
```

## 5.Virtual device settings

### Send mock data:

Set `SEND_MOCK_DATA` true. This parameter will make virtual device to publish mock data to TB.

```
...
SEND_MOCK_DATA=true
...
```
### Subscribe RPC topic
Set `SUBSCRIBE_RPC` true. This parameter will make virtual device to subscribe RPC topic to TB.

```
...
SUBSCRIBE_RPC=true
...
```

### Start virtual device


```
npm run device-start
```

## 6. Save tenant token
### Save token to file
After run this script, the token will save to `output/JWTToken.txt`

```
npm run save-token
```

## 7. Environmental variables

| Variables             | Description                                               | Default value |
|-----------------------|-----------------------------------------------------------|---------------|
| HOST                  | TB server host                                            | 127.0.0.1     |
| PORT                  | TB server port                                            | 80            |
| NUMBER_OF_DEVICES     | Virtual device count                                      | 1             |
| DEVICE_NAME           | Virtual device name in TB                                 | device        |
| DEVICE_TYPE           | Virtual device type in TB                                 | default       |
| DEVICE_LABEL          | Virtual device label in TB                                |               |
| MQTT_PORT             | TB MQTT port                                              | 1883          |
| PUBLISH_FREQUENCY     | Virtual device publish data frequency (s)                 | 10            |
| CONNECT_DELAY         | Virtual device connection delay (ms)                      | 5             |
| TEST_TIME             | Virtual device publish data counts (0 is unlimited times) | 0             |
| SEND_MOCK_DATA        | Virtual device will publish mock data                     | false         |
| SUBSCRIBE_RPC         | Virtual device will subscribe TB RPC topic                | false         |
| SAVE_OUTPUT_FREQUENCY | Save program output every few seconds (s)                 | 30            |
| SAVE_LOG              | Program will save log to output folder                    | false         |

## 8. Output folder

### Folder tree
After run init script, you can see `output` folder as follow.

```bash
output
    ├─error
    ├─mockData
    └─RPC
```

### Folder description

| Folder   | Description                          |
|----------|--------------------------------------|
| error    | Save device MQTT connect error log   |
| mockData | Save device publish data information |
| RPC      | Save device RPC message              |


## 9. Config folder
This folder is used to store device information. For more details, you can see [Send RPC to single device](#SendRPC)

## 10. Virtual device RPC test

### 1. Subscribe RPC topic & Virtual device start
Make sure that `.env` exist and set SUBSCRIBE_RPC=true.
```
npm run device-start
```

### 2. Get device id
After add device, you can see `deviceList.json` as follow.

Copy this device id.
```json
[
    {"name":"device-0","id":"83e8c0b0-18bc-11ec-bcd9-05ea625289ba","token":"QDHyEI5isiE7sRkqQKWj"}
]
```

### 3. Get JWT token
After run save tenant token script, you can see `output/JWTToken.txt` as follow.

Copy this JWT token.
```
Bearer token
```

### 3. Call RPC server-side API
You can use postman to send a server-side RPC to virtual device. Send a HTTP POST request to the following URL.

Paste the previously copied device id and JWT token to send RPC request.
```
http(s)://host:port/api/plugins/rpc/twoway/{deviceId}
```

Or you can test API by curl.

```bash
curl -v -X POST -d @set-gpio-request.json http://$SERVER:$HOST/api/plugins/rpc/twoway/$DEVICE_ID --header "Content-Type:application/json"  --header "X-Authorization: $JWT_TOKEN"
```

set-gpio-request.json:
```json
{
    "method": "setGpio",
    "params": {
        "pin": "23",
        "value": 1
    }
}
```

### 4. Virtual device response message
After receive server-side RPC, you can get the response as follow.
```json
{
    "method": "setGpio",
    "params": {
        "pin": "23",
        "value": 1,
        "isDone": true
    }
}
```

<span id='SendRPC'></span>

## 11. Send RPC to single device
If you want to send a two way RPC to real device or third party service, you can use this tool for test.

### 1. Add your device
By default, you need to add your device in `config` folder. Create `device.json` file like as follow.

```json
{
    "name":"TB device-name",
    "id":"TB device-id",
    "token":"TB device-access-token"
}
```

### 2. Run script
After add your device, run script to send RPC message. 

```bash
npm run send-RPC
```

This tool will continuously send two way RPC to your device. Send message payload like as follow.

```json
{
    "method": "echo",
    "params": {
        "action": "echo",
        "test": "test"
    }
}
```

### 3. Save logs
When two way RPC API receive response, this tool will save response to `output/RPC/SendTwoWayRPCLog*.json`. 
This tool can judge success or failure response and output then as follow.

```json
{
    "data": {
        "error": [
            {
                "message": {}
            }
        ],
        "success": [
            {
                "message": {
                    "method": "rpc test",
                    "params": {
                        "requestId": "20",
                        "action": "echo"
                    }
                }
            }
        ]
    },
    "updateTime": "time"
}
```
