// Product Constructor
class Counters {
    constructor(count_id, count_name, count_value, count_colorback, count_colortext) {
        this.count_id = count_id;
        this.count_name = count_name;
        this.count_value = count_value;
        this.count_colorback = count_colorback;
        this.count_colortext = count_colortext;
    }
}
class UserData {
    constructor(user_name, user_pass) {
        this.user_name = user_name;
        this.user_pass = user_pass;
        //this.user_email = user_email;

    }
}
class LoginUser {
    loginUser(User, Pass) {
        if (User === "samoreno2" || Pass === "12345") {
            window.location = '../src/count.html';
        } else {
            alert("vuelve a ingresar las contrasenias");
        }
    }

    registerUser(NameUser, password, email) {

    }
    isLogued(userIdActual) {

    }
    validar_email(email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }
    validar_pass(pass, repass) {
        return pass === repass ? true : false;
    }
}

// UI Constructor
class UI {
    addProduct(Counters) {
        const userDatalist = document.getElementById('data_list');
        /* crea un elemento en el dom con el contador */
        const element = document.createElement('tr');
        element.innerHTML = `
            <td> ${Counters.count_name} </td>
            <td> ${Counters.count_value} </td>
            <td> <a href="#" class="btn btn-danger" name="delete">Delete</a> </td>
            <td> <a href="#" class="btn btn-warning" name="edit">Editar</a> </td>
        `;
        userDatalist.appendChild(element);
    }
    
    addProductcounter(Counters) {
        const userDatalist = document.getElementById('counters_row');
        /* crea un elemento en el dom con el contador */
        const element = document.createElement('div');
        element.className = 'col-sm';
        element.name = 'delete'
        element.innerHTML = `
            <h1>
                ${Counters.count_value} 
            </h1>
            <h5>
                ${Counters.count_name} 
            </h5>
        `;
        userDatalist.appendChild(element);
    }

    hidenObj(elemnt, status) {
        document.getElementById(elemnt).style.display = status;
    }

    resetForm(formid) {
        document.getElementById(formid).reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Succsssfully', 'info');
        }
    }

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

    if (user === 'admin' || pass === '12345') {

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
        email = document.getElementById('email').value,
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
            ui.addProduct(newUser);
        } else {
            ui.showMessage('El correo esta mal', 'danger');
        }
    } else {
        ui.showMessage('las Password no Iguales', 'danger');
    }
    e.preventDefault();
});


document.getElementById('counter_form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('nameCounter').value,
            value = document.getElementById('valueCounter').value;

        // Create a new Oject Product
        const product = new Counters("1", name, value, "#ccc", "#ccc");

        // Create a new UI
        const ui = new UI();

        // Input User Validation
        if (name === '' || value === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        } else {

            // Save Product
            ui.addProduct(product);
            ui.addProductcounter(product);
            console.log(product)
            ui.showMessage('counter Added Successfully', 'success');
            ui.resetForm('counter_form');
        }
        e.preventDefault();

    });

document.getElementById('counters_list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        ui.deleteProduct('div');
        e.preventDefault();
    });