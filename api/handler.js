'use strict';

const AWS = require('aws-sdk');
const Pusher = require('pusher');

AWS.config.setPromisesDependency(Promise);
AWS.config.update({region:'us-east-1'});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'ap1',
  encrypted: true,
})

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

module.exports.pushDeviceData = async (event, context) => {
  const body = JSON.parse(event.body || {});

  const item = Object.assign({
    type: body.type || 'device-data',
    timestamp: (new Date()).getTime()
  }, body);

  await dynamodb.put({
    TableName: process.env.DEVICE_DATA_TABLE,
    Item: item
  }).promise();

  console.log('Pushing');
  await pusher.trigger('monitor', item.type, item);
  console.log('pushed to monitor', item.type, item);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ok',
    }),
  };
};

module.exports.getHeartRate = async (event, context) => {
  const { Items: [ item = {} ] = [] } = await dynamodb.query({
    TableName: process.env.DEVICE_DATA_TABLE,
    Limit: 1,
    KeyConditionExpression: '#tp = :tp',
    ExpressionAttributeNames: {
      '#tp': 'type',
    },
    ExpressionAttributeValues: {
      ':tp': 'heartrate',
    },
    ScanIndexForward: false
  }).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      heartRate: item.data || 'unknown',
    }),
  };
};
