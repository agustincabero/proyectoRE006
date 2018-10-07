var expect = chai.expect;

describe('Reservar Horario', function(){
  var resTest;

  beforeEach(function(){
    resTest = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]);
  })

  it('remove to schedules array', function(){
    resTest.reservarHorario("12:00");
    expect(resTest.horarios).to.not.include("12:00");
  })

  it('not change schedules array', function(){
    resTest.reservarHorario("19:30");
    expect(resTest.horarios).to.not.include("19:30");
    expect(resTest.horarios).to.eql(["12:00", "13:30", "16:00"]);
  })

  it('not change schedules array 2', function(){
    resTest.reservarHorario();
    expect(resTest.horarios).to.eql(["12:00", "13:30", "16:00"]);
  })

})

describe('Obtener puntuacion', function(){
  var resTest;

  beforeEach(function(){
    resTest = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]);
  })

  it('average rating', function(){
    var avgRating = resTest.obtenerPuntuacion();
    expect(avgRating).to.equal(6.3);
  })

  it('not rating rest', function(){
    resTest.calificaciones = [];
    var avgRating = resTest.obtenerPuntuacion();
    expect(avgRating).to.equal(0);
  })

})

describe('Calificar', function(){
  var resTest;

  beforeEach(function(){
    resTest = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]);
  })

  it('add vote', function(){
    var ratings = resTest.calificaciones;
    var arrayAux = Object.assign([], ratings);
    resTest.calificar(5);

    expect(ratings).to.not.eql(arrayAux);
  })

})
