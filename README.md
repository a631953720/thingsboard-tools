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
JWT_TOKEN= TB_tenant_jwt_token
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

## 5.Publish mock data

### Send mock data:
This script will publish mock data to TB.

```
npm run device-start
```