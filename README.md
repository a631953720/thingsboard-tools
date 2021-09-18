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
TEST_TIME= MQTT_publish_data_times
JWT_TOKEN= TB_tenant_jwt_token
```

## 3.Init or Reset

### Run add device script. 

When script finish, you can see `deviceList.json` in `output` folder

```
npm run init
```

### Run delete all device script:

```
npm run remove
```

## 4.Publish mock data

### Run virtual-device-start:
This script will publish mock data to TB.

```
npm run virtual-device-start
```