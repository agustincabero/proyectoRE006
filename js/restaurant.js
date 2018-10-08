var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var nuevoHorarios = this.horarios.filter(horario => horarioReservado !== horario);
    this.horarios = nuevoHorarios;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return this.promedio(this.calificaciones);
    }

}

Restaurant.prototype.sumatoria = function(arrayNumeros) {
    var res = 0;
    arrayNumeros.forEach(e => {
        res += e;
    });
    return res;
}

Restaurant.prototype.promedio = function(arrayNumeros) {
    var suma = this.sumatoria(arrayNumeros);
    var res = suma / arrayNumeros.length;
    return Math.round(res * 10) / 10;
}
