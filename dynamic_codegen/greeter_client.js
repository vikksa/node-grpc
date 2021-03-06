/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';
var x = __dirname + '/communications.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    x,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).com.sarvika.clowre.protogen.communication;

function main() {
  var client = new hello_proto.EmailIntegration('localhost:8002',
                                       grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  var meta = new grpc.Metadata();
  meta.add('appId', 'form-builder');
  client.sendEmail({urn: 'dXJuOmZiczpmb3JtOjpoYnMtdGVzdC92aWtyYW1fdGVzdF9mb3Jt', countryCode: "IN"},meta, function(err, response) {
    console.log(response.stateDataList);
  });
}

main();
