var Reserva = function(horario, cantidadPersonas, precioPorPersona, codDescuento) {
  this.horario = horario;
  this.personas = cantidadPersonas;
  this.precio = precioPorPersona;
  this.descuento = codDescuento
}

Reserva.prototype.calcularPrecioBase = function() {
  return this.personas * this.precio;
}

Reserva.prototype.calcularDescuentoPorCodigo = function() {
  switch (this.descuento) {
    case 'DES1':
      return this.precio;
    
    case 'DES200':
      return 200;
    
    case 'DES15':
      return this.calcularPrecioBase() * 0.15;
  
    default:
      return 0;
  }
}

Reserva.prototype.calcularDescuentoPorGrupo = function() {
  if (this.personas > 3) {
    if (this.personas > 3 && this.personas < 6 ) {
      return this.calcularPrecioBase() * 0.05;
    }
    if (this.personas >= 6  && this.personas < 8 ) {
      return this.calcularPrecioBase() * 0.10;
    }
    if (this.personas >= 8) {
      return this.calcularPrecioBase() * 0.15;
    }
  } else return 0
}

Reserva.prototype.calcularAdicionalPorHorario = function() {
  var horas = this.horario.getHours();
  if (horas === 13 || horas === 20 ) {
    return this.calcularPrecioBase() * 0.05;
  } else return 0;
}

Reserva.prototype.calcularAdicionalPorDia = function() {
  var dia = this.horario.getDay();
  if (dia === 0 || dia === 5 || dia === 6) {
    return this.calcularPrecioBase() * 0.10;
  } else return 0;
}

Reserva.prototype.calcularPrecioFinal = function() {
  var precioFinal = this.calcularPrecioBase();
  precioFinal -= this.calcularDescuentoPorCodigo();
  precioFinal -= this.calcularDescuentoPorGrupo();
  precioFinal += this.calcularAdicionalPorHorario();
  precioFinal += this.calcularAdicionalPorDia();
  return precioFinal;
}
