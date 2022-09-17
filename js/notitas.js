
/* FUNCIONALIDADES DEL PROYECTO
C -> CREATE
R -> READ
U -> UPDATE
D -> DELETE
*/

//===> ACTUALIZA LOS DATOS DESDE EL L.S. <===
readAll();

//===> BOTONES DEL SISTEMA <===

// let botonAgregar = document.querySelector("#btnActualizar");
// botonAgregar.addEventListener("click", (e) => {
//     //Swal.fire('Excelente, registro ingresado/Actualizado..!!','','success')
//     createNotita(e);
// });

let botonAgregar = document.querySelector("#btnActualizar");
botonAgregar.addEventListener("click", (e) => {createNotita(e)});


let limpiar = document.getElementById('limpiar');
limpiar.addEventListener('click', (e) => {clearForm()})

let refresh = document.getElementById('refresh');
refresh.addEventListener
    refresh.addEventListener('click', _ => {
        //alert("refresh");
        clearForm();
        readAll();
        location.reload();  //Esto lo hago ya que no se actualiza el readAll()
})

// let editList = document.querySelectorAll(".btn-outline-warning");
let editaList = document.querySelectorAll(".btn-outline-primary");
editaList.forEach(element => {
    element.addEventListener('click', (e) => {
        // console.log(element.id.match(/(\d+)/)[0]);
        leeUno(element.id.match(/(\d+)/)[0]);
    })
});
//===> Lee y presenta el registro seleccionado <===
function leeUno(id){
    // alert("Lee 1 registro");
    //Swal.fire('Se editará el registro No.: '+id,'','success')
    let notitas = read("notitas");
    let notitaOne = notitas[id - 1];
    
    // console.log(notitaOne.id);

    idnotita.value = notitaOne.id;
    //id.value = notita.id;
    titulo.value = notitaOne.titu;
    responsable.value = notitaOne.resp;
    notita.value = notitaOne.noti;
}

let BorraList = document.querySelectorAll(".btn-outline-danger");
BorraList.forEach(element => {
    element.addEventListener('click', (e) => {
        Swal.fire('El registro ha sido eliminado..!!','','success')
        delNotita(element.id.match(/(\d+)/)[0]);
        readAll();
    })
});
function delNotita(id){

    // console.log(id);

    let notitas = read("notitas");
    // alert(id);
    let filtrado = notitas.filter(notitaP => notitaP.id != id);
    save("notitas", filtrado);
    //readAll();
}




//===> FUNCIONES PARA TRABAJAR CON EL LOCAL STORAGE <==========

function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}
function save(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}
//==================FIN FUNCIONES===========================


//obtengo los elementos del formulario
let idnotita = document.querySelector("#id");
let titulo = document.querySelector("#titulo");
let responsable = document.querySelector("#responsable");
let notita = document.querySelector("#notita");



//===> CREA Y ACTUALIZA UN REGISTRO (CREATE y el UPDATE)<===
function createNotita(e){

    e.preventDefault();
    // console.log(e);

    //===> Leo el Objeto notitas <===
    let notitas = read("notitas");
    // alert(titulo.value);

if(titulo.value != null && titulo.value != ""){

    //===> Realiza el CREATE si el id es cero o no existe <===
    if (idnotita.value == 0 || idnotita.value == null ){
        // alert(idnotita.value);
        // alert(titulo.value);
        const nota = {
            id: (notitas.length + 1), //Considera la longitud del objeto
            titu : titulo.value,
            resp : responsable.value,
            noti : notita.value,
        }
        notitas.push(nota); // Graba el array
        // Swal.fire('Excelente, registro ingresado..!!','','success')
    } else {
         //===> Realiza el UPDATE <===
        let pos = notitas.findIndex(nota => nota.id == idnotita.value);
        if (pos >= 0){
            notitas[pos].titu = titulo.value;
            notitas[pos].resp = responsable.value;
            notitas[pos].noti = notita.value;
        }
        
    }

    Swal.fire('Excelente, registro Ingresado o modificado correctamente..!!','','success')
    save("notitas", notitas); //Graba en local storage
    clearForm();
    readAll();

 }else{
     //alert("Debe ingresar datos, antes de guardar..!!");
     //Swal.fire('El registro está vacio, no se guardará..!!','','success');
     Swal.fire({icon: 'error',title: 'El registro está vacío...!!',text: 'Ingrese datos e intente nuevamente..!!',footer: '<a href="">Consulte a soporte...?</a>'
      })
     // Swal.fire('Any fool can use a computer');
 }

    // location.reload();  //Esto lo hago ya que no se actualiza el readAll()

    // Swal.fire('Excelente, registro Ingresado/modificado..!!','','success')
    // setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//===> Limpia Campos de Formulario <===
function clearForm(){
    id.value = 0;
    titulo.value = '';
    responsable.value = '';
    notita.value = '';
}


//===> Lee y presenta todos los datos en pantalla <===
function readAll(){
    // alert('lee y muestra todos los registros desde la memoria...!!')
    let tbody = document.querySelector("#notitas");
    // let tbody = window.localStorage.getItem('#notitas')
    tbody.innerHTML = "";

    let notitas = read("notitas");

    notitas.forEach(element => {
        tbody.innerHTML += `<tr>
            <td>${element.id}</td>
            <td>${element.titu}</td>
            <td>${element.resp}</td>
            <td>${element.noti}</td>
            <td>
                <button type="button" id="edit${element.id}" class="btn btn-outline-primary">editar</button> 
                <button type="button" id="del${element.id}" class="btn btn-outline-danger">eliminar</button> 
            </td>
        </tr>
        `;
    });

}







