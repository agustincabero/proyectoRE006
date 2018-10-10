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

    it('expect not change schedules array', function(){
      resTest.reservarHorario("19:30");
      expect(resTest.horarios).to.not.include("19:30");
      expect(resTest.horarios).to.eql(["12:00", "13:30", "16:00"]);
    })

    it('expect not change schedules array 2', function(){
      resTest.reservarHorario();
      expect(resTest.horarios).to.eql(["12:00", "13:30", "16:00"]);
    })

  })

  describe('Obtener puntuacion', function(){

    it('expect return average rating', function(){
      var avgRating = resTest.obtenerPuntuacion();
      expect(avgRating).to.equal(6.3);
    })

    it('expect return 0 for no rating rest', function(){
      resTest.calificaciones = [];
      var avgRating = resTest.obtenerPuntuacion();
      expect(avgRating).to.equal(0);
    })

  })

  describe('Calificar', function(){

    it('expect add right calification', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar(5);
      expect(ratings).to.not.eql(arrayAux);
    })

    it('expect not add invalid calification', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);
      resTest.calificar('');
      resTest.calificar(undefined);
      resTest.calificar(NaN);
      resTest.calificar(6.3);
      resTest.calificar(-1);
      expect(ratings).to.eql(arrayAux);
    })

    it('expect add bounds cases', function(){
      var ratings = resTest.calificaciones;
      var arrayAux = Object.assign([], ratings);      
      resTest.calificar(0);
      resTest.calificar(1);
      resTest.calificar(10);
      resTest.calificar(11);
      expect(ratings.length).to.equal(arrayAux.length + 2);
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

    it('expect result with correct id', function(){
      var res = lisTest.buscarRestaurante(5);
      var refRes = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]);
      expect(res).to.eql(refRes);
    })

    it('expect msg error with wrong id', function(){
      var res = lisTest.buscarRestaurante(88);
      expect(res).to.equal('No se ha encontrado ningún restaurant');
    })    

  })

  describe('Obtener restaurante', function(){

    it('expect results without filters', function(){
      var res = lisTest.obtenerRestaurantes(null, null, null);
      expect(res.length).to.equal(lisTest.restaurantes.length);
    })

    it('expect results with type filter', function(){
      var res = lisTest.obtenerRestaurantes('Ensalada', null, null);
      expect(res.length).to.equal(1);
    })

    it('expect results with city filter', function(){
      var res = lisTest.obtenerRestaurantes(null, 'Nueva York', null);
      expect(res.length).to.equal(1);
    })

    it('expect results with schedule filter', function(){
      var res = lisTest.obtenerRestaurantes(null, null, '11:30');
      expect(res.length).to.equal(1);
    })

    it('expect results with all filters', function(){
      var res = lisTest.obtenerRestaurantes('Asiática', 'Berlín', '12:00');
      expect(res.length).to.equal(1);
    })

    it('expect not results without coincidences', function(){
      var res = lisTest.obtenerRestaurantes('Ensalada', 'Berlín', '12:00');
      expect(res.length).to.equal(0);
    })

  })

})

describe("Clase Reserva", function(){
  var reserva1;
  var reserva2;
  beforeEach(function(){
    reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");  
  })

  describe('Calcular Precio Base', function(){

    it('return base price if the reservation is correct', function(){
      var basePrice = reserva1.calcularPrecioBase();
      expect(basePrice).to.equal(2800);
    })

  })

  describe('Calcular Precio Final', function(){

    it('return final price if the reservation is correct', function(){
      var finalPrice = reserva2.calcularPrecioFinal();
      expect(finalPrice).to.equal(100);
    })
    
  })

})
