# What does this tool solve?

## 1. Auto get and save tenant jwt token.
This tool will auto login to TB. Users don't need to get tokens by themselves, and also to save the token to `output/JWTToken.txt`.

## 2. Create virtual device to TB
This tool will create device to TB.

After create virtual device, you can send mock data or subscribe TB RPC topic. 

## 3. Subscribe TB RPC topic
You can use this tool to observe how TB RPC work.

If you set virtual device subscribe TB RPC topic. Virtual device will respond with a message to the server when receiving any server-side RPC request.

You can get more information as TB document.
https://thingsboard.io/docs/user-guide/rpc/

## 4. Save program output
After this tool execute for a period of time. Program will save output to json file.

You can run this tool for a long time and keep recording the output results, so you don’t have to worry about program interruption.

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

When script finish, you can see `output` folder has created.

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

## 6 Save tenant token
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
| SEND_MOCK_DATA        | Virtual device will publish mock data                     | true          |
| SUBSCRIBE_RPC         | Virtual device will subscribe TB RPC topic                | false         |
| SAVE_OUTPUT_FREQUENCY | Save program output every few seconds (s)                 | 30            |
| SAVE_LOG              | Program will save log to output folder                    | true          |

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
