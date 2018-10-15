var expect = chai.expect;

describe("Clase Restaurant", function(){
  var resTest;

  beforeEach(function(){
    resTest = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7])
  })

  describe('Reservar Horario', function(){

    it('removes the schedule if the reservation is correct', function(){
      resTest.reservarHorario("12:00");
      expect(resTest.horarios).to.not.include("12:00");
    })

    it('not changes the schedule if the reservation´s hour no exist', function(){
      resTest.reservarHorario("19:30");
      expect(resTest.horarios).to.not.include("19:30");
      expect(resTest.horarios).to.eql(["12:00", "13:30", "16:00"]);
    })

    it('not changes the schedule if the reservation´s hour is empty', function(){
      resTest.reservarHorario();
      expect(resTest.horarios).to.eql(["12:00", "13:30", "16:00"]);
    })

  })

  describe('Obtener puntuacion', function(){

    it('return the restaurant´s average rating', function(){
      var avgRating = resTest.obtenerPuntuacion();
      expect(avgRating).to.equal(6.3);
    })

    it('return 0 for no rating rest', function(){
      resTest.calificaciones = [];
      var avgRating = resTest.obtenerPuntuacion();
      expect(avgRating).to.equal(0);
    })

  })

  describe('Calificar', function(){

    it('add a calification if this is correct', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(5);
      expect(ratings).to.not.eql(arrayAux);
    })

    it('not add if the calification is a empty string', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar('');
      expect(ratings).to.eql(arrayAux);
    })

    it('not add if the calification is undefined', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(undefined);
      expect(ratings).to.eql(arrayAux);
    })

    it('not add if the calification is NaN', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(NaN);
      expect(ratings).to.eql(arrayAux);
    })

    it('not add if the calification isn´t integer', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(6.3);
      expect(ratings).to.eql(arrayAux);
    })

    it('not add if the calification is negative', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(-1);
      expect(ratings).to.eql(arrayAux);
    })

    it('add calification in bounds cases', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(1);
      resTest.calificar(10);
      expect(ratings.length).to.equal(arrayAux.length + 2);
    })

    it('not add calification outside bounds cases', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);      
      resTest.calificar(0);
      resTest.calificar(11);
      expect(ratings.length).to.equal(arrayAux.length);
    })

  })

})

describe("Clase Listado", function(){
  var lisTest = new Listado([
    new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
    new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
    new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
  ]);

  describe('Buscar restaurante', function(){

    it('return a result with correct id', function(){
      var res = lisTest.buscarRestaurante(5);
      var referenceRes = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]);
      expect(res).to.eql(referenceRes);
    })

    it('return msg error with wrong id', function(){
      var res = lisTest.buscarRestaurante(88);
      expect(res).to.equal('No se ha encontrado ningún restaurant');
    })  
    
    it('return msg error without id', function(){
      var res = lisTest.buscarRestaurante();
      expect(res).to.equal('No se ha encontrado ningún restaurant');
    })

  })

  describe('Obtener restaurante', function(){

    it('return all restaurants without filters', function(){
      var res = lisTest.obtenerRestaurantes(null, null, null);
      expect(res.length).to.equal(lisTest.restaurantes.length);
    })

    it('return correct restaurants with type filter', function(){
      var res = lisTest.obtenerRestaurantes('Ensalada', null, null);
      expect(res.length).to.equal(1);
    })

    it('return correct restaurants with city filter', function(){
      var res = lisTest.obtenerRestaurantes(null, 'Nueva York', null);
      expect(res.length).to.equal(1);
    })

    it('return correct restaurants with schedule filter', function(){
      var res = lisTest.obtenerRestaurantes(null, null, '11:30');
      expect(res.length).to.equal(1);
    })

    it('return correct restaurants with all filters', function(){
      var res = lisTest.obtenerRestaurantes('Asiática', 'Berlín', '12:00');
      expect(res.length).to.equal(1);
    })

    it('not return results without coincidences', function(){
      var res = lisTest.obtenerRestaurantes('Ensalada', 'Berlín', '12:00');
      expect(res.length).to.equal(0);
    })

  })

})

describe("Clase Reserva", function(){
  var reserva1;
  var reserva2;

  before(function(){
    reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    reserva2 = new Reserva (new Date(2018, 7, 27, 13, 59), 2, 150, "DES200");
    reserva3 = new Reserva (new Date(2018, 7, 28, 12, 00), 4, 200, "DES15");
    reserva4 = new Reserva (new Date(2018, 7, 21, 20, 00), 10, 300);
    reserva5 = new Reserva (new Date(2018, 7, 25, 20, 30), 6, 400, "DES1");  
  })

  describe('Calcular Precio Base', function(){

    it('return correct base price with a reservation for 8 people with a price of $350 each one', function(){
      var basePrice = reserva1.calcularPrecioBase();
      expect(basePrice).to.equal(2800);
    })

  })

  describe('Calcular Precio Final', function(){

    it('return correct final price with a reservation at saturday 20:30 for 6 people with discount code DES1', function(){
      var finalPrice = reserva5.calcularPrecioFinal();
      expect(finalPrice).to.equal(2120);
    })

    it('return correct final price with a reservation at tuesday 20:00 for 10 people without discount code', function(){
      var finalPrice = reserva4.calcularPrecioFinal();
      expect(finalPrice).to.equal(2700);
    })
    
  })

  describe('Calcular Adicionales', function(){

    it('return additional fees of 10% on base price if the reservation´s date is at weekend', function(){
      var additionalFees = reserva1.calcularAdicionalPorDia();
      expect(additionalFees).to.equal(280);
    })

    it('return additional fees of 5% on base price if the reservation has been made for 13-14hs or 20-21hs', function(){
      var additionalFees = reserva2.calcularAdicionalPorHorario();
      expect(additionalFees).to.equal(15);
    })

    it('no additional fees apply if the reservation has been made between monday and thursday and outside peak hours', function(){
      var additionalFees = reserva3.calcularAdicionalPorHorario();
      var additionalFees2 = reserva3.calcularAdicionalPorDia();
      expect(additionalFees).to.equal(0);
      expect(additionalFees2).to.equal(0);
    })
    
  })

  describe('Calcular Descuentos', function(){

    it('return 5% of base price if the reservation is for a number of people between 4 and 6', function(){
      var finalPrice = reserva3.calcularDescuentoPorGrupo();
      expect(finalPrice).to.equal(40);
    })

    it('return 10% of base price if the reservation is for a number of people between 6 and 8', function(){
      var finalPrice = reserva5.calcularDescuentoPorGrupo();
      expect(finalPrice).to.equal(240);
    })

    it('return 15% of base price if the reservation is for a number of people > 8', function(){
      var finalPrice = reserva1.calcularDescuentoPorGrupo();
      expect(finalPrice).to.equal(420);
    })

    it('not return discounts if the reservation is for a number of people < 4', function(){
      var finalPrice = reserva2.calcularDescuentoPorGrupo();
      expect(finalPrice).to.equal(0);
    })

    it('return 15% of base price with discount code DES15', function(){
      var discount = reserva3.calcularDescuentoPorCodigo();
      expect(discount).to.equal(120);
    })

    it('return $200 off with discount code DES200', function(){
      var discount = reserva2.calcularDescuentoPorCodigo();
      expect(discount).to.equal(200);
    })

    it('return unit price with discount code DES1', function(){
      var discount = reserva1.calcularDescuentoPorCodigo();
      expect(discount).to.equal(350);
    })

    it('not return discounts if not has code', function(){
      var discount = reserva4.calcularDescuentoPorCodigo();
      expect(discount).to.equal(0);
    })
    
  })

})
