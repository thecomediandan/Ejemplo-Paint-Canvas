const canvas = document.getElementById('canvas');
const dif = canvas.getBoundingClientRect(); // Nos muestra las distancias del elemento canvas con respecto a la ventana del navegador con sus propiedades top, left, right, bottom, es importante esta informacion ya que donde este posicionado el canvas las coordenadas del mouse variarian porquee el entorno de coordenadas del canvas es independiente
const ctx = canvas.getContext("2d");

let painting, color, linewidth, difX, difY;
// Evento al presionar el mouse
canvas.addEventListener("mousedown", e=>{
    // Recalculamos las coordenadas del mouse para el canvas
    difX = e.clientX - dif.left;
    difY = e.clientY - dif.top;
    painting = true; // Activamos para pintar
    color = document.getElementById("input-color").value; // Capturamos el color seleccionado para el pincel
    linewidth = document.getElementById("input-range").value; // Capturamos el rango que determina el grosor del pincel
    // Empezamos un nuevo trazo
    ctx.beginPath();
});


// Al mover el pincel detectamos el movimiento del mouse
canvas.addEventListener("mousemove", e=>{
    // Detectamos si tenemos permiso para dibujar
    if (painting) {
        // Enviamos las coordenadas correspondientes para dibujar
        dibujar(difX, difY, e.clientX - dif.left, e.clientY - dif.top);
        // Volvemos a reclacular las coordenadas del mouse para ir continuando con el trazo
        difX = e.clientX - difX.left;
        difY = e.clientY - difY.top;
    }
});
// Al levantar el mouse desactivamos los permisos para dibnujar y cerramos los trazos
addEventListener("mouseup", ()=>{
    ctx.closePath();
    painting = false;
})
// La funcion dibujar nos permite posicionarnos en un punto inicial con los primeros 2 parametros y con los otros 2 generamos los puntos que se iran uniendo con el metodo stroke para generar las lineas.
const dibujar = (x1, y1, x2, y2)=>{
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}