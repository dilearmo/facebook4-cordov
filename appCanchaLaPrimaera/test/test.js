
QUnit.test( "equal test", function( assert ) {
    var horaConvertida = convertirHora('20');
    assert.equal( horaConvertida, '8:00pm', "Se envía 20, y se recibe " + horaConvertida );
    horaConvertida = convertirHora('6');
    assert.equal( horaConvertida, '6:00am', "Se envía 6, y se recibe " + horaConvertida );
    horaConvertida = convertirHora('12');
    assert.equal( horaConvertida, '12:00md', "Se envía 12, y se recibe " + horaConvertida );
    horaConvertida = convertirHora('00');
    assert.equal( horaConvertida, '00:00am', "Se envía 00, y se recibe " + horaConvertida );
    horaConvertida = convertirHora('22');
    assert.notEqual( horaConvertida, '9:00pm', "Se envía 22, se espera algo distinto a 9:00pm. Se recibe " + horaConvertida );
    horaConvertida = convertirHora('6');
    assert.notEqual( horaConvertida, '5:00am', "Se envía 6, se espera algo distinto a 5:00am. Se recibe " + horaConvertida );
    horaConvertida = convertirHora('2');
    assert.notEqual( horaConvertida, '12:00md', "Se envía 2, se espera algo distinto a 12:00md. Se recibe " + horaConvertida );
    
});