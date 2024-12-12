let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

class Turno {
    static id = turnos.length ? turnos[turnos.length - 1].id + 1 : 1; // Continuar IDs desde el último turno almacenado
    constructor(cliente, auto, kilometros, servicio, fecha, hora) {
        this.id = Turno.id++;
        this.cliente = cliente;
        this.auto = auto;
        this.kilometros = kilometros;
        this.servicio = servicio;
        this.fecha = fecha;
        this.hora = hora;
    }
}

// Función para registrar un turno
const registrarTurno = () => {
    const cliente = document.getElementById("cliente").value.trim();
    const auto = document.getElementById("auto").value.trim();
    const kilometros = parseInt(document.getElementById("kilometros").value.trim());
    const servicio = document.getElementById("servicio").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const hora = document.getElementById("hora").value.trim();

    // Programación defensiva
    if (!cliente || !auto || isNaN(kilometros) || !servicio || !fecha || !hora) {
        console.log("Error: Todos los campos son obligatorios y deben ser válidos.");
        return;
    }

    const nuevoTurno = new Turno(cliente, auto, kilometros, servicio, fecha, hora);
    turnos.push(nuevoTurno);

    // Guardar en localStorage
    localStorage.setItem("turnos", JSON.stringify(turnos));

    mostrarTurnos();
    document.getElementById("formTurno").reset();
};

// Función para buscar turnos por cliente
const buscarTurnoPorCliente = () => {
    const nombreCliente = document.getElementById("busquedaCliente").value.trim().toLowerCase();
    const listaResultados = document.getElementById("resultadosBusqueda");
    listaResultados.innerHTML = "";

    const resultados = turnos.filter(({ cliente }) => cliente.toLowerCase() === nombreCliente);

    resultados.length === 0
        ? (listaResultados.innerHTML = `No se encontraron turnos para el cliente "${nombreCliente}".`)
        : resultados.forEach(({ id, auto, kilometros, servicio, fecha, hora }) => {
              const fechaFormateada = formatearFecha(fecha);
              const li = document.createElement("li");
              li.textContent = `ID: ${id}, Auto: ${auto}, Kilometros: ${kilometros}, Servicio: ${servicio} Fecha: ${fechaFormateada}, Hora: ${hora}`;
              listaResultados.appendChild(li);
          });
};

// Función para mostrar todos los turnos
const mostrarTurnos = () => {
    const listaTurnos = document.getElementById("listaTurnos");
    listaTurnos.innerHTML = "";

    turnos.length === 0
        ? (listaTurnos.innerHTML = "No hay turnos registrados.")
        : turnos.forEach(({ id, cliente, auto, kilometros, servicio, fecha, hora }) => {
              const fechaFormateada = formatearFecha(fecha);
              const li = document.createElement("li");
              li.textContent = `ID: ${id}, Cliente: ${cliente}, Auto: ${auto}, Kilometros: ${kilometros}, Servicio: ${servicio}, Fecha: ${fechaFormateada}, Hora: ${hora}`;
              listaTurnos.appendChild(li);
          });
};

const resetTurnos = () => {
    const resetTurnos = document.querySelector(".resetTurnos")
    resetTurnos.addEventListener("click", () => {
        localStorage.clear()
        const listaTurnos = document.getElementById("listaTurnos");
        turnos = []
        listaTurnos.innerHTML=""
    })
}
resetTurnos()

// funcion para formatear fecha a dia-mes-año
const formatearFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split("-");
    return `${day}-${month}-${year}`;
};

document.querySelectorAll("#servicioMenu .dropdown-item").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        const servicioSeleccionado = event.target.getAttribute("data-value");
        document.getElementById("servicio").value = servicioSeleccionado;
        document.getElementById("servicioDropdown").textContent = servicioSeleccionado;
    });
});



// Eventos
document.getElementById("registrarBoton").addEventListener("click", (event) => {
    event.preventDefault();
    registrarTurno();
});

document.getElementById("btnBuscar").addEventListener("click", (event) => {
    event.preventDefault();
    buscarTurnoPorCliente();
});

// Mostrar turnos al cargar la página
mostrarTurnos();
