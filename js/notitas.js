
//*****************************************
//**                                     **  
//**  FUNCIONALIDADES DEL PROYECTO CRUD  **
//**    C -> CREATE                      **
//**    R -> READ                        **
//**    U -> UPDATE                      **
//**    D -> DELETE                      **
//**                                     **  
//*****************************************

//===> ACTUALIZA LOS DATOS EN PANTALLA DESDE EL L.S. <===
readAll();

//===> BOTONES DEL SISTEMA <===

//==> Crea una nueva Notita <===
let botonAgregar = document.querySelector("#btnActualizar");
botonAgregar.addEventListener("click", (e) => {createNotita(e)});

//===> Limpia los campos de ingreso de datos <===
let limpiar = document.getElementById('limpiar');
limpiar.addEventListener('click', (e) => {clearForm()})

//===> Si llega a ser necesario refresca todo, hasta el formulario <===
let refresh = document.getElementById('refresh');
refresh.addEventListener
    refresh.addEventListener('click', _ => {
        //alert("refresh");
        clearForm();
        readAll();
        location.reload();  //Esto lo hago cuandoe no se actualiza el readAll()
})


//===> FUNCIONES PARA TRABAJAR CON EL LOCAL STORAGE <==========
function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}
function save(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}
//==================FIN FUNCIONES===========================


//===> Leo los datos desde el formulario <===
let idnotita = document.querySelector("#id");
let titulo = document.querySelector("#titulo");
let responsable = document.querySelector("#responsable");
let notita = document.querySelector("#notita");



//===> CREA Y ACTUALIZA UN REGISTRO (CREATE y UPDATE)<===
function createNotita(e){

    e.preventDefault();

    let notitas = read("notitas");
    
//Si el título es vacio no lo guarda
if(titulo.value != null && titulo.value != ""){

    //===> Realiza el CREATE si el id es cero o no existe <===
    if (idnotita.value == 0 || idnotita.value == null ){
         const nota = {
            id: (notitas.length + 1), //Considera la longitud del objeto
            titu : titulo.value,
            resp : responsable.value,
            noti : notita.value,
        }
        notitas.push(nota); 
        Swal.fire('Excelente, registro ingresado correctamente..!!','','success')
    } else {
         //===> Realiza el UPDATE <===
        let pos = notitas.findIndex(nota => nota.id == idnotita.value);
        if (pos >= 0){
            notitas[pos].titu = titulo.value;
            notitas[pos].resp = responsable.value;
            notitas[pos].noti = notita.value;
        }
        Swal.fire('El registro: '+idnotita.value+', ha sido modificado correctamente..!!','','success')
   
    }

    save("notitas", notitas); 
    clearForm();
    readAll();

 }else{
     Swal.fire({icon: 'error',title: 'El registro está vacío...!!',text: 'Ingrese datos e intente nuevamente..!!',footer: '<a href="">Consulte a soporte...?</a>'
      })
 }

 }

//===> Lee (READ) y presenta el registro seleccionado <===
function leeUno(id){
    let notitas = read("notitas");
    let notitaOne = notitas[id - 1];
 
    idnotita.value = notitaOne.id;
    titulo.value = notitaOne.titu;
    responsable.value = notitaOne.resp;
    notita.value = notitaOne.noti;
}

//===> Borra (DELETE) el registro seleccionado <===
function delNotita(id){
    let notitas = read("notitas");
    let filtrado = notitas.filter(notitaP => notitaP.id != id);
    save("notitas", filtrado);
    readAll();
    Swal.fire('El registro: '+id+', ha sido eliminado..!!','','success')
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
    let tbody = document.querySelector("#notitas");
    tbody.innerHTML = "";

    let notitas = read("notitas");

    notitas.forEach(element => {
        tbody.innerHTML += `<tr>
            <td>${element.id}</td>
            <td>${element.titu}</td>
            <td>${element.resp}</td>
            <td>${element.noti}</td>
            <td>
            <button onclick="leeUno(${element.id})"    class="btn btn-outline-primary">editar</button> 
            <button onclick="delNotita(${element.id})" class="btn btn-outline-danger">eliminar</button> 
    </td>
        </tr>
        `;
    });

}







