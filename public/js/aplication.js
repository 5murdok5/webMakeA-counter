var firebaseConfig = {
    apiKey: "AIzaSyCibDxDovJlSl23xl6Lhrk_Q-69T0ozhJM",
    authDomain: "contadores-19b0e.firebaseapp.com",
    databaseURL: "https://contadores-19b0e.firebaseio.com",
    projectId: "contadores-19b0e",
    storageBucket: "contadores-19b0e.appspot.com",
    messagingSenderId: "421095019754",
    appId: "1:421095019754:web:ac9c20aceec50e164a3393",
    measurementId: "G-E5SG82VJTP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var database = firebase.database();

class Counters {
    constructor(count_id, count_name, count_value) {
        this.count_id = count_id;
        this.count_name = count_name;
        this.count_value = count_value;
    }
}

class UserData {
    constructor(user_name, user_pass, user_email) {
        this.user_name = user_name;
        this.user_pass = user_pass;
        this.user_email = user_email;

    }
}

class dbinformation {
    
    getElemnets() {
        console.log('dentro de la funcion')
        const lg =  new LoginUser();
        const ui =  new UI();
        var userId = lg.UserOn();
        var refCount = firebase.database().ref('/users/' + userId + "/counters/");
        refCount.on("child_added", function (data) {
          var countvalue = data.val();
          const counter =  new Counters(countvalue.count_id, countvalue.count_name, countvalue.count_value);
          ui.addCounter(counter);
          ui.addCounterPreview(counter);
          
        });
      }

    dataInforU(username, email) {
        localStorage.setItem('user', username);
        localStorage.setItem('email', email);
        console.log("datos guardados en localstorage");
    }

}

class LoginUser {
    UserOn(){
        var userId = firebase.auth().currentUser.uid;
        return userId;
    }
    Register(UserData) {

        const ui = new UI();
        const userUp = UserData.user_name + "@user.com";
        const db = new dbinformation();
        console.log(userUp);

        firebase.auth().createUserWithEmailAndPassword(userUp, UserData.user_pass)
            .then(function (user) {
                console.log('datos almacenados');
                db.dataInforU(UserData.user_name, UserData.user_email);
                ui.hidenObj('lgform', 'none');
                ui.hidenObj('homelg', '');
                ui.showMessage('Has Ingresado', 'success');
            })
            .catch(function (error) {
                console.error(error)
                ui.showMessage('error al registrar el Usuario', 'warning');
            });
    }

    passCorrect(repass, pass) {

        let check;
        const ui = new UI();
        if (repass === pass) {
            check = true;

        } else {
            check = false;
            ui.showMessage("las contrasenias no coinciden", "warning");
            console.log(repass + " / " + pass);
        }
        /*  */
        return check;
    }

    logUser(user, pass) {

        const ui = new UI();
        var userLg = user + "@user.com";

        firebase.auth().signInWithEmailAndPassword(userLg, pass)
            .then(function (user) {
                ui.hidenObj('lgform', 'none');
                ui.hidenObj('homelg', '');
                ui.showMessage('ingreso exitoso', 'success');

            }).catch(function (error) {
                ui.showMessage(error, 'danger');
            });
    }


    validar_email(email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }

    /*     validar_pass(pass, repass) {
            return pass === repass ? true : false;
        } */

    /* guarda los datos para luego ser almacenados */
    dataInforU(username, email) {

        localStorage.setItem('user', username);
        localStorage.setItem('email', email);
        console.log("datos guardados en localstorage");

    }
    exit() {

        const ui = new UI();

        firebase.auth().signOut().then(function () {
            this,
            ui.showMessage('Saliste Correctamente', "info");
            ui.hidenObj('lgform', '');
            ui.hidenObj('homelg', 'none');

        }).catch(function (error) {
            ui.showMessage(error, "danger");
        });
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
    }

    startAnimation() {
        console.log('comenzo la animacion');
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
    reStart() {
        window.location.reload();
    }
    

    /* control de mensajes de alerta */
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `container alert alert-${cssClass} mt-2 fixed-top text-center`;
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


window.onload = function () {
    const ui = new UI();
    const lg = new dbinformation();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        ui.showMessage('Ya ingresaste', "info");
        ui.hidenObj('lgform', 'none');
        ui.hidenObj('homelg', '');
        lg.getElemnets();
        setTimeout(function () {
            ui.startAnimation();
        }, 1000)
        
      } else {
        ui.showMessage('Inicia Sesion', "info");
        ui.hidenObj('lgform', '');
        ui.hidenObj('homelg', 'none');
      }
    });
  }

document.getElementById("inicio").addEventListener("click", function (e) {
    const lg = new LoginUser();
    const user = document.getElementById('NameUser').value,
        pass = document.getElementById('PassWord').value;

    lg.logUser(user, pass);

    e.preventDefault();
});

document.getElementById("registrate").addEventListener("click", function (e) {

    const ui = new UI();
    const lg = new LoginUser();

    const user = document.getElementById('NameUser').value,
        pass = document.getElementById('PassWord').value,
        email = document.getElementById('email').value,
        repass = document.getElementById('re-PassWord').value;

    const userdata = new UserData(user, pass, email);
    const cheker = lg.passCorrect(pass, repass);
    const chekerEmail = lg.validar_email(email);

    if (user === '' || email === '' || email === '' || repass === '') {
        ui.showMessage("Llene todos los campos !!", "danger");
    } else {
        if (cheker === true) {
            if (chekerEmail === true) {
                lg.Register(userdata);
            } else {
                ui.showMessage("Correo Invalido", "danger");
            }

        } else {
            ui.showMessage("no se pudo registrar, intende de nuevo.", "danger");

        }


    }
    console.log(chekerEmail);
    e.preventDefault();

});

/* funcion disparadora registro */

document.getElementById("OpenReg").addEventListener("click", function (e) {
    const ui = new UI();
    ui.hidenObj('inicio', 'none');
    ui.hidenObj('OpenReg', 'none');
    ui.hidenObj('re-pass', '');
    ui.hidenObj('correo', '');
    ui.hidenObj('registrate', '');
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

document.getElementById("exit").addEventListener("click", function () {
    let lg = new LoginUser();
    const ui = new UI();

    lg.exit();
    ui.reStart();
});