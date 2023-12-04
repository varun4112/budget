function regForm() {
  // window.location = "./register.html";
  var col2 = document.getElementById("loginform");
  let reg_form = `
  <form id="loginform">
            <h1>Register</h1>
            <br />
            <input type="text" id="fullName" placeholder="Name:" />
            <input type="text" id="registerUserName" placeholder="User Name:" />
            <input type="password" id="registerPassword" placeholder="Password" />
            <p id="regwarn"></p>
            <p>
              Already Have an Account?
              <button onclick="loginForm()" id="regbtn">Log in</button>
            </p>
            <button class="btn btn-primary" id="login" onclick="register()" type="button">
              Register
            </button>
            <br />
            </form>
            `;
  col2.innerHTML = reg_form;
}

function loginForm() {
  var col2 = document.getElementById("loginform");
  let login_form = `
  <form id="loginform">
            <h1>Login</h1>
            <br />
            <input type="text" id="loginUserName" placeholder="User Name:" />
            <input type="password" id="loginPassword" placeholder="Password" />
            <p class="passWarning">Hello</p>
            <p>
              Create an account:
              <button onclick="regForm()" id="regbtn">Register</button>
            </p>
            <button class="btn btn-primary"  onclick="login()" type="reset">
              Login
            </button>
            <br />
</form>`;
  col2.innerHTML = login_form;
}

function login() {
  var un = document.getElementById("loginUserName").value;
  console.log(un);
  var ps = document.getElementById("loginPassword").value;
  console.log(ps);

  if (un === "" || ps === "") {
    let para = document.getElementById("loginWarning");
    para.innerHTML = `<p id="loginWarning" style="color:red">Please Enter All fields</p>`;
  } else {
    let storedUser = JSON.parse(localStorage.getItem(un));

    if (storedUser && storedUser.pswd === ps) {
      console.log("Login Successful");
      localStorage.setItem("CurrentUser", un);
      window.location = "./landing.html";
    } else {
      let para = document.getElementById("loginWarning");
      para.innerHTML = `<p id="loginWarning" style="color:red">Incorrect Username or Password</p>`;
    }
  }
}

function register() {
  console.log("reg");

  let fn = document.getElementById("fullName").value;
  let run = document.getElementById("registerUserName").value;
  let rpswd = document.getElementById("registerPassword").value;

  if (fn === "" || run === "" || rpswd === "") {
    console.log("regyes");
    let para = document.getElementById("regwarn");
    para.innerHTML = `<p id="regwarn" style="color:red">Please Enter All fields</p>`;
  } else {
    let user = {
      fName: fn,
      uName: run,
      pswd: rpswd,
      balance: 0,
      exp: 0,
      inc: 0,
    };

    let users = JSON.stringify(user);
    localStorage.setItem(run, users);

    console.log("Registration Complete");
    loginForm(); // Assuming loginForm() is a valid function for your application
  }
}

function logout() {
  window.location = "./index.html";
  localStorage.removeItem("currentUser");
}

function expOrInc() {
  let currentUser = localStorage.getItem("CurrentUser");
  let Mcat = document.getElementById("catSelector").value;
  let Mdesc = document.getElementById("monDesc").value;
  let Mamt = Math.floor(document.getElementById("monAmt").value);
  let Cuser = JSON.parse(localStorage.getItem(currentUser));
  console.log(Cuser);
  addTransaction();

  if (Mcat == "Income") {
    Cuser.inc += Mamt;
    Cuser.balance += Mamt;
    console.log(Cuser);
    localStorage.setItem(currentUser, JSON.stringify(Cuser));
    // updating balance
  } else {
    Cuser.exp += Mamt;
    Cuser.balance -= Mamt;
    console.log(Cuser);
    localStorage.setItem(currentUser, JSON.stringify(Cuser));
  }
}
// chart
let currUser = localStorage.getItem("CurrentUser");
userChart = JSON.parse(localStorage.getItem(currUser));
let balChart = userChart.balance;
let expChart = userChart.exp;
const xValues = ["Balance", "Expense"];
const yValues = [balChart, expChart];
const barColors = ["#198754", "#dc3545"];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Balance V/S Expense",
    },
  },
});

function viewTable() {
  window.location = "./table.html";
}

function addTransaction() {
  const nameInput = document.getElementById("monDesc");
  const amountInput = document.getElementById("monAmt");
  const typeInput = document.getElementById("catSelector");

  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (name && !isNaN(amount)) {
    // Retrieve existing transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Add the new transaction
    transactions.push({ name, amount, type });

    // Save the updated transactions to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Clear input fields
    nameInput.value = "";
    amountInput.value = "";

    // Update the displayed transactions and totals
  }
}

// function addTransaction() {
//   const nameInput = document.getElementById("monDesc");
//   const amountInput = document.getElementById("monAmt");
//   const typeInput = document.getElementById("catSelector");

//   const name = nameInput.value;
//   const amount = parseFloat(amountInput.value);
//   const type = typeInput.value;

//   if (name && !isNaN(amount)) {
//     // Generate a unique identifier for the transaction (assuming name is unique)
//     const transactionKey = "jana"; // Convert name to lowercase and replace spaces with underscores

//     // Retrieve existing transactions from localStorage
//     const transactions = JSON.parse(localStorage.getItem("transactions")) || {};

//     // Add the new transaction with a unique key
//     transactions[transactionKey] = { name, amount, type };

//     // Save the updated transactions to localStorage
//     localStorage.setItem("transactions", JSON.stringify(transactions));

//     // Clear input fields
//     nameInput.value = "";
//     amountInput.value = "";

//     // Update the displayed transactions and totals
//   }
// }
