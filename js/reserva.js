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
}

Reserva.prototype.calcularDescuentoPorGrupo = function() {
}

Reserva.prototype.calcularAdicionalPorHorario = function() {
}

Reserva.prototype.calcularAdicionalPorDia = function() {
}

Reserva.prototype.calcularPrecioFinal = function() {
}
