/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
            
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
        
        
    }
};

app.initialize();


var scopes = 'email';

var statusChangeCallback = function(response, callback) {
    console.info('statudChangeCallback');
    if(response.status === 'connected') {
        getFacebookData();
    } else {
        //document.getElementById('status').innerHTML = 'Por favor, inicie sesión en Facebook';
        callback(false);
    }
}

var checkLoginState = function(callback) {
    console.info('checkLoginState');
    FB.getLoginStatus(function(response) {
        console.info('FB.getLoginStatus');
        statusChangeCallback(response, function(data) {
            callback(data);
        });
    });  
}

var getFacebookData = function() {
    console.info('getFacebookData');
    FB.api('/me', {fields: 'name,email'}, function(response) {
        // guardar sesi[on]
        console.info('FB.api obteniendo datos');
        console.error('Bienvenido ' + response.name + ' ' + response.id + ' ' + response.email);
        var img = document.createElement('img');
        img.setAttribute('src', 'http://graph.facebook.com/' + response.id + '/picture/type=large');
        var imgDiv = document.getElementById('img'); 
        imgDiv.appendChild(img);
    });
}

var facebookLogin = function() {
    console.info('facebookLogin');
    checkLoginState(function(response) {
        if(!response) {
            FB.login(function(response) {
                if(response.status === 'connected') {
                    getFacebookData();
                }
            }, { scope: scopes });
        } else {
            console.info('No respuesta en facebookLogin');
        }
    });
}

var facebookLogout = function() {
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected') {
            if(confirm('¿Está seguro(a) de que desea cerrar sesión?')) {
                FB.logout(function(response) {
                    // Cerró sesión
                });
            } else {
                return false;
            }
        }
    }); 
}