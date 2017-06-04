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


var permisos = 'email';

function checkFBLoginStatus() {
    console.info('checking status');
    return facebookConnectPlugin.getLoginStatus(
        function(result) {
            if(result.status === 'connected') {
                console.info('Check status connected');
                return true;
            } else if(result.status === 'unknown' || result.status === 'not_authorized'){
                console.info('Por favor logueese en facebook');
                return false;
            }
        },
        function() {
            console.error('Error al checar el status');
            return false;
        }
    );
}

function fbLogin() {
    console.info('Login ' + checkFBLoginStatus());
    //if(checkFBLoginStatus() == false) {
        console.info('Logueando');
        facebookConnectPlugin.login(
            [permisos], 
            function(result) {
                // success
                console.info('logueo exitoso ' + result.id);
                alert(result.status);
                
            },
            function() {
                // error
            }
        );   
    //}
}

function fbLogout() {
    console.info('Logout');
    //if(checkFBLoginStatus() == true) {
        console.info('Cerrando sesi[on');
        facebookConnectPlugin.logout( 
            function(result) {
                // success
                // redirigir
                console.info('Sesion cerrada');
                alert('Sesion cerrada');
                
            },
            function() {
                // error
                console.info('No se ha podido cerrar sesi[on');
                alert('No se ha podido cerrar sesi[on');
            }
        );   
    //}
}