function Utilui() {
    this.table = {
        getTable: function () {
            return document.getElementById("table");
        },
        addRow: function (persona) {
            /// var formDom = document.getElementsByTagName("form")[0]; //// prueva de boton cancelar
            const addtr = document.createElement("tr");
            var tBody = document.getElementById("table").getElementsByTagName("tbody")[0];
            tBody.appendChild(addtr);
            ///agrega a fila el numero
            const addth = document.createElement("th");
            addth.scope = "row";
            addtr.appendChild(addth);
            var numbP = tBody.getElementsByTagName("tr");
            addth.innerHTML = numbP.length;

            ///agrega a fila datos de los input
            var columNames = Object.keys(persona);
            for (var i = 0; i < columNames.length; i++) {
                if (columNames[i] == "urlImg") {
                    const addtdimg = document.createElement("td");
                    addtdimg.style.width = "100px";
                    const img = document.createElement('img');
                    img.src = persona[columNames[i]];
                    img.classList.add("img-fluid");
                    img.style.maxHeight = "100px";
                    addtr.appendChild(addtdimg);
                    addtdimg.appendChild(img);
                } else {
                    const addtd = document.createElement("td");
                    addtd.dataset.col = columNames[i];
                    addtd.innerHTML = persona[columNames[i]];
                    addtr.appendChild(addtd);
                }
            }
            ///crea boton borrar
            const addDelet = document.createElement("td");
            const buttonDelet = document.createElement("button");
            buttonDelet.innerHTML = "Borrar";
            buttonDelet.classList.add("btn", "btn-outline-danger", "align-baseline");
            buttonDelet.dataset.fila = numbP.length;
            addtr.appendChild(addDelet);
            addDelet.appendChild(buttonDelet);

            ///evento clik boton borrar
            buttonDelet.addEventListener("click", deletChild);
            function deletChild(event) {
                debugger
                personas.splice(parseInt(event.target.dataset.fila) - 1, 1);
                debugger
                var U = new Utilui();
                U.table.deleteTable()
                U.table.addTable()
            }
            /// crea boton editar
            const editRow = document.createElement("td");
            const buttonEdit = document.createElement("button");
            buttonEdit.innerHTML = "Editar";
            buttonEdit.classList.add("btn", "btn-outline-primary", "align-baseline");
            buttonEdit.dataset.fila = numbP.length;
            addtr.appendChild(editRow);
            editRow.appendChild(buttonEdit);



            buttonEdit.addEventListener("click", editChild);
            function editChild(event) {
                debugger
                editIndexPersona = parseInt(event.target.dataset.fila) - 1;
                var editPersona = personas[editIndexPersona];
                var columnaNombre = Object.keys(editPersona);
                for (var i = 0; i < columnaNombre.length; i++) {
                    document.getElementById(columnaNombre[i]).value = editPersona[columnaNombre[i]];
                }

                /// document.getElementById("elemento").style.display = "block";
            }



        },
        addTable: function () {
            for (var i = 0; i < personas.length; i++) {
                this.addRow(personas[i]);
            }
        },
        deleteTable: function () {
            var tBody = this.getTable().getElementsByTagName("tbody")[0];
            while (tBody.firstChild) {
                tBody.removeChild(tBody.firstChild);
            }
        }
    };

    this.form = {
        getforinputs: function () {
            return {
                urlImg: document.getElementById("urlImg"),
                name: document.getElementById("name"),
                surname: document.getElementById("surname"),
                sex: document.getElementById("sex"),
                age: document.getElementById("age"),
                address: document.getElementById("address"),
                occupation: document.getElementById("occupation"),
                mail: document.getElementById("mail"),

            };
        },
        getform: function () {
            return document.getElementById("form");
        }
    };
}

/// guarda toda la info de la lista
var personas = [];
var editIndexPersona = "";

function save() {
    var data = new Utilui();
    var dataForm = data.form.getform();
    var newPerson = {};
    //validar el form completo, en caso de que no sea valido verificar cada input
    if (!dataForm.checkValidity()) {
        var dataFormInputs = data.form.getforinputs();
        //extraer todos los nombres de las propiedades 
        var listInput = Object.keys(dataFormInputs);
        //recorrer la lista de propiedades 
        for (var i = 0; i < listInput.length; i++) {
            //acceder al valor de la propiedad en dataFormImput 
            if (!dataFormInputs[listInput[i]].validationMessage == "") {
                dataFormInputs[listInput[i]].classList.add("is-invalid");
            } else {
                dataFormInputs[listInput[i]].classList.remove("is-invalid");
            }
        }
    } else {
        //si el form es valido entonces remover todos los estilos de error
        var dataFormInputs = data.form.getforinputs();
        var listInput = Object.keys(dataFormInputs);
        for (var i = 0; i < listInput.length; i++) {
            dataFormInputs[listInput[i]].classList.remove("is-invalid");
            newPerson[listInput[i]] = dataFormInputs[listInput[i]].value;
            dataFormInputs[listInput[i]].value = "";
        }
        if (typeof editIndexPersona !== 'number') {
            data.table.addRow(newPerson);
            personas.push(newPerson);
        } else {
            debugger
            personas[editIndexPersona] = newPerson;
            editIndexPersona = undefined;

            var U = new Utilui();
            U.table.deleteTable()
            U.table.addTable()
        }
        ///quitaButton();
    }

}

function cancelarEdit() {
    var U = new Utilui();
    var dataFormInputs =  U.form.getforinputs();
    var listInput = Object.keys(dataFormInputs);
    for (var i = 0; i < listInput.length; i++){
        dataFormInputs[listInput[i]].value = "";
    }
    ///quitaButton();   
    editIndexPersona = undefined;
}
function quitaButton(){
    document.getElementById("elemento").style.display = "none";
}

var personF = [
    {
        urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8CyR2H3cmoDoDjAxgLUGXTCi3KYp8X-nAA&usqp=CAU",
        name: "sam",
        surname: "as",
        sex: "hombre",
        age: 21,
        address: "sdfsdsdf",
        occupation: "ocio",
        mail: "rfr@gmail.com",
    },
    {
        urlImg: "https://www.dzoom.org.es/wp-content/uploads/2010/09/mirada-ojos-encuadre-primer-plano-sexy-810x540.jpg",
        name: "pri",
        surname: "as",
        sex: "hombre",
        age: 21,
        address: "sdfsdsdf",
        occupation: "ocio",
        mail: "rfr@gmail.com",
    },
    {
        urlImg: "https://www.nationalgeographic.com.es/medio/2013/12/03/antonio_sanchez_chamorro_665x1000.jpg",
        name: "gus",
        surname: "as",
        sex: "hombre",
        age: 21,
        address: "sdfsdsdf",
        occupation: "ocio",
        mail: "rfr@gmail.com",
    },
    {
        urlImg: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv",
        name: "eli",
        surname: "as",
        sex: "mujer",
        age: 21,
        address: "sdfsdsdf",
        occupation: "ocio",
        mail: "rfr@gmail.com",
    },
    {
        urlImg: "https://studiosol-a.akamaihd.net/letras/215x215/fotos/4/b/7/5/4b75389fe14b1823e30b0f3de1d3f6d3.jpg",
        name: "milo",
        surname: "as",
        sex: "mujer",
        age: 21,
        address: "sdfsdsdf",
        occupation: "ocio",
        mail: "rfr@gmail.com",
    },
]

function generarTabla() {
    var data = new Utilui();
    personas = personF;
    data.table.addTable();
}
generarTabla();