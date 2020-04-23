
// Product Constructor

class Counters {
    constructor(count_id, count_name, count_value) {
        this.count_id = count_id;
        this.count_name = count_name;
        this.count_value = count_value;
    }
}

class UserData {
    constructor(user_name, user_pass) {
        this.user_name = user_name;
        this.user_pass = user_pass;
       // this.user_email = user_email;

    }
}
/* 
class dbinformation {


    watchTable() {
        console.log('dentro de watch');
        const ui = new UI();
        var refCount = firebase.ref('/users/SXYqY9NzCyXaunUJSqeOYWZqwCh1/counters/');
        refCount.on("child_added", function (data) {
          var countvalue = data.val();
          const contadores = new Counters(countvalue.count_id, countvalue.count_name, countvalue.count_value);
          var result = ui.addCounterPreview(contadores);
          innerHTML("loadCounter", result);
        });
      }


} */

class LoginUser {
    logUser(user, pass) {
        var access;
        if (user === 'admin') {
            if (pass === '12345') {

                access = true;
            } else {
                access = false;
            }
        }
        return access;
    }

    validar_email(email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }

    validar_pass(pass, repass) {
        return pass === repass ? true : false;
    }
    /* guarda los datos para luego ser almacenados */
    dataInforU(username, email) {

        localStorage.setItem('user', username);
        localStorage.setItem('email', email);
        console.log("datos guardados en localstorage");

    }
}

// UI Constructor
class UI {

    addCounter(Counters) {
        const userDatalist = document.getElementById('data_list');
        /* crea un elemento en el dom con el contador */
        const element = document.createElement('tr');
        element.innerHTML = `
            <td> ${Counters.count_name} </td>
            <td> ${Counters.count_value} </td>
            <td> <a href="#" class="btn btn-danger" name="delete">Delete</a> </td>
            <td> <a href="#" class="btn btn-warning" name="edit">Editar</a> </td>`;
        userDatalist.appendChild(element);
    }

    addCounterPreview(Counters) {
        const userDatalist = document.getElementById('counters_row');
        /* crea un elemento en el dom con el contador */
        const element = document.createElement('div');
        element.className = 'col-sm';
        element.name = 'delete'
        element.innerHTML = `
            <h1 class="num" id="count_num">
                ${Counters.count_value} 
            </h1>
            <h5 id="count_title">
                ${Counters.count_name} 
            </h5>`;
        userDatalist.appendChild(element);
        this.startAnimation();
    }

    startAnimation() {
        $(".num").counterUp({
            delay: 5,
            time: 3000
        });
    }

    hidenObj(elemnt, status) {
        document.getElementById(elemnt).style.display = status;
    }

    resetForm(formid) {
        document.getElementById(formid).reset();
    }

    deleteCounters(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Succsssfully', 'info');
        }
    }
    /* control de mensajes de alerta */
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `container alert alert-${cssClass} mt-2 fixed-top`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        const container = document.querySelector('#bodyPrincipal');
        const app = document.querySelector('#App');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 4000);
        $(".alert").fadeOut(4000);

    }

}

document.getElementById("inicio").addEventListener("click", function (e) {

    const ui = new UI();
    const lg = new LoginUser();
    const user = document.getElementById('NameUser').value,
        pass = document.getElementById('PassWord').value;

    var access = lg.logUser(user, pass);

    if (access === true) {
        ui.hidenObj('lgform', 'none');
        ui.hidenObj('homelg', '');

        ui.showMessage('ingreso exitoso', 'success');

    } else {
        ui.showMessage('Nombre de Usuario o Password Invalidas', 'danger');
    }
    
    e.preventDefault();
});



/* funcion disparadora registro */

document.getElementById("registrate").addEventListener("click", function (e) {

    const ui = new UI();
    const lg = new LoginUser();

    ui.hidenObj('inicio', 'none');
    ui.hidenObj('re-pass', '');
    ui.hidenObj('correo', '');

    const user = document.getElementById('NameUser').value,
        pass = document.getElementById('PassWord').value,
       // email = document.getElementById('email').value,
        repass = document.getElementById('re-PassWord').value;

    const newUser = new UserData(user, pass);

    if (email === '' || repass === '') {
        ui.showMessage('rellene los campos de registro', 'info');

    } else if (lg.validar_pass(pass, repass)) {
        if (lg.validar_email(email)) {
            ui.showMessage('registro exitoso', 'success');


            ui.resetForm('formlogin');
            ui.hidenObj('inicio', '');
            ui.hidenObj('re-pass', 'none');
            ui.hidenObj('correo', 'none');
            ui.resetForm();
            ui.showMessage('Product Added Successfully', 'success');
            ui.addCounter(newUser);
        } else {
            ui.showMessage('El correo esta mal', 'danger');
        }
    } else {
        ui.showMessage('las Password no Iguales', 'danger');
    }
    e.preventDefault();
});

/* agrega un contador */
document.getElementById('counter_form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('nameCounter').value,
            value = document.getElementById('valueCounter').value;

        // Create a new Oject Product
        const counter = new Counters('1', name, value);

        // Create a new UI
        const ui = new UI();

        // Input User Validation
        if (name === '' || value === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        } else {
            // Save Product
            ui.addCounter(counter);
            ui.addCounterPreview(counter);
            ui.showMessage('counter Added Successfully', 'success');
            ui.resetForm('counter_form');
            console.log(counter);
        }
        e.preventDefault();

    });
/* boton para eliminar los elementos de las celdas*/
document.getElementById('counters_list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteCounters(e.target);
        e.preventDefault();
    });