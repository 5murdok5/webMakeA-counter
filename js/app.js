// Product Constructor
class Counters {
    constructor(count_id, count_title, count_name, count_value) {
        this.count_id = count_id;
        this.count_title = count_title;
        this.count_name = count_name;
        this.count_value = count_value;
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
    addProduct(UserData) {
        const userDatalist = document.getElementById('data');
        /* crea un elemento en el dom con el contador */
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>userName</strong>: ${UserData.user_name} -
                    <strong>password</strong>: ${UserData.user_pass}  
                    
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        userDatalist.appendChild(element);
    }
    /* oculta/muestra cualquier objero */
    hidenObj(elemnt, status) {
        document.getElementById(elemnt).style.display = status;
    }
    
    resetForm() {
        document.getElementById('loginUser').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Succsssfully', 'success');
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
        }, 3000);
        $(".alert").fadeOut(3000);

    }
}




document.getElementById("inicio").addEventListener("click", function (e) {
    const ui = new UI();
    const lg = new LoginUser();
    const user = document.getElementById('NameUser').value,
          pass = document.getElementById('PassWord').value;

    if (user === 'admin' || pass ==='12345') {
        
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
    const newUser = new UserData(user,pass);
    if (email === '' || repass === '') {
        ui.showMessage('rellene los campos de registro', 'info');

    } else if (lg.validar_pass(pass, repass)) {
        if (lg.validar_email(email)) {
            ui.showMessage('registro exitoso', 'success');
            
            
            ui.resetForm();
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


// DOM Events


/* document.getElementById('product-form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('name').value,
            price = document.getElementById('price').value,
            year = document.getElementById('year').value;

        // Create a new Oject Product
        const product = new Product(name, price, year);

        // Create a new UI
        const ui = new UI();

        // Input User Validation
        if (name === '' || price === '' || year === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        }else{

        // Save Product
        ui.addProduct(product);
        ui.showMessage('Product Added Successfully', 'success');
        ui.resetForm();
        }
        e.preventDefault();
        
    });
 */
/* document.getElementById('product-list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        e.preventDefault();
    }); */