const authorData = JSON.parse(localStorage.getItem('authors')) || [];
// const bookData = JSON.parse(localStorage.getItem('books')) || [];
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const loggedUser = localStorage.getItem("loggedUser");
const homePage = document.getElementById("home-page");
const logout = document.getElementById("btn-logout");
const modalChangePassword = document.getElementById("modal-change-password");
let subSectionNo = 0;
let childNo = 0;
let no;


  
// REGISTER PAGE

if (registerForm) {
    const userName = document.getElementById("user-name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const register = document.getElementById("register-form");
    let role;
    document.getElementById("admin-role").addEventListener("click", () => {
        role = "Admin";
        document.getElementById("admin-role").classList.remove("is-invalid");
        document.getElementById("user-role").classList.remove("is-invalid");
    });
    document.getElementById("user-role").addEventListener("click", () => {
        role = "User";
        document.getElementById("admin-role").classList.remove("is-invalid");
        document.getElementById("user-role").classList.remove("is-invalid");
    });

    userName.addEventListener("input", () => {
        userName.classList.remove("is-invalid");
    });
    email.addEventListener("input", () => {
        email.classList.remove("is-invalid");
    });
    password.addEventListener("input", () => {
        password.classList.remove("is-invalid");
    });
    confirmPassword.addEventListener("input", () => {
        confirmPassword.classList.remove("is-invalid");
    });
    register.addEventListener("submit", function (event) {

        const id = Math.floor(Math.random() * 100);
        event.preventDefault();

        if (userName.value && email.value && password.value && confirmPassword.value && role) {

            if (password.value !== confirmPassword.value) {
                alert("Enter valid password");
            }
            else {
                let existEmail = authorData.length && authorData.some(data =>
                    data.authorEmail === email.value);

                if (existEmail) {
                    alert("This email is already in use");
                }
                else {
                    let authorName = userName.value;
                    let authorEmail = email.value;
                    let password = document.getElementById("password").value;

                    authorData.push({ id, authorName, authorEmail, role, password });
                    localStorage.setItem("authors", JSON.stringify(authorData));

                    alert("account created successfully");
                    window.location.href = "login.html";
                }
            }
        }
        else {
            if (!userName.value) {
                userName.classList.add("is-invalid");
            }
            if (!email.value) {
                email.classList.add("is-invalid");
            }
            if (!password.value) {
                password.classList.add("is-invalid");
            }
            if (!confirmPassword.value) {
                confirmPassword.classList.add("is-invalid");
            }
            if (!role) {
                document.getElementById("admin-role").classList.add("is-invalid");
                document.getElementById("user-role").classList.add("is-invalid");
            }
        }
    });
}

// LOGIN PAGE
if (loginForm) {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    email.addEventListener("input", () => {
        email.classList.remove("is-invalid");
    });
    password.addEventListener("input", () => {
        password.classList.remove("is-invalid");
    });

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let existData = authorData.length && authorData.some(data =>
            data.authorEmail === email.value && data.password === password.value);

        if (email.value && password.value) {
            if (!existData) {
                alert("Enter valid data");
            }
            else {
                alert("Login successful");
                let authoremail = email.value;
                localStorage.setItem("loggedUser", authoremail);
                window.location.href = "home.html";
            }
        }
        else {
            if (!email.value) {
                email.classList.add("is-invalid");
            }
            if (!password.value) {
                password.classList.add("is-invalid");
            }
        }
    });
}

// RESET PASSWORD PAGE
const resetPassword = document.getElementById("reset-pwd-form");

if (resetPassword) {

    resetPassword.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email");
        const password = document.getElementById("new-password");
        const confirmPassword = document.getElementById("confirm-password");

        email.addEventListener("input", () => {
            email.classList.remove("is-invalid");
        });
        password.addEventListener("input", () => {
            password.classList.remove("is-invalid");
        });
        confirmPassword.addEventListener("input", () => {
            confirmPassword.classList.remove("is-invalid");
        });
        if (email.value && password.value && confirmPassword.value) {
            let existEmail = authorData.length && authorData.some(data =>
                data.authorEmail === email.value);

            if (existEmail) {

                if (password.value === confirmPassword.value) {
                    for (let i = 0; i < authorData.length; i++) {

                        if (authorData[i].authorEmail === email.value) {
                            authorData[i].password = password.value;
                            localStorage.setItem('authors', JSON.stringify(authorData));

                            alert("password reset successfully");
                            window.location.href = "login.html";
                        }
                    }
                }
                else {
                    alert("Please confirm your password");
                }
            }
            else {
                alert("Email does not exist");
            }
        }
        else {
            if (!email.value) {
                email.classList.add("is-invalid");
            }
            if (!password.value) {
                password.classList.add("is-invalid");
            }
            if (!confirmPassword.value) {
                confirmPassword.classList.add("is-invalid");
            }
        }
    });
}

// HOME PAGE

if (homePage) {
    homePage.onload = displayBooks;
}
function displayBooks() {

    let loggedUser = localStorage.getItem("loggedUser");
    if (!loggedUser) {
        window.location.href = "register.html";
    }
    else {
        authorData.forEach(findUserEmail => {
            if (loggedUser === findUserEmail.authorEmail) {
                let name = findUserEmail.authorName;
                let initial = name.charAt(0).toUpperCase();
                document.getElementById("btn-initials").innerText = `${initial}`;
            }
        });
    }
}
if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('loggedUser');
        logout.href = "login.html";
    });
}

if (modalChangePassword) {
    const changePasswordForm = document.getElementById("change-pwd-form");
    const newPassword = document.getElementById("new-password");
    const confirmPassword = document.getElementById("confirm-password");

    newPassword.addEventListener("input", () => {
        newPassword.classList.remove("is-invalid");
    });
    confirmPassword.addEventListener("input", () => {
        confirmPassword.classList.remove("is-invalid");
    });

    changePasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (newPassword.value && confirmPassword.value) {
            if (newPassword.value === confirmPassword.value) {
                let loggedUser = localStorage.getItem("loggedUser");
                for (let i = 0; i < authorData.length; i++) {
                    if (authorData[i].authorEmail === loggedUser) {
                        authorData[i].password = newPassword.value;
                        localStorage.setItem("authors", JSON.stringify(authorData));

                        alert("Your password is changed");
                    }
                }
            }
            else {
                alert("Please confirm your new password");
            }
        }
        else {
            if (!newPassword.value) {
                newPassword.classList.add("is-invalid");
            }
            if (!confirmPassword.value) {
                confirmPassword.classList.add("is-invalid");
            }
        }
    });
}


// ---------------------------------------------------------------------------
// ----------------------HOME PAGE - ADD BOOK MODAL---------------------------
// ----------------------------------------------------------------------------


// // +++++++++++++++++  MAIN SECTION +++++++++++++++++++ 

let bookData = {
    author: "Purvi",
    authorId: 1,
    bookName: "",
    sections: []
};


let sectionNo;
addSection();

function addSection(sectionId) {
    if (!sectionId) {
        sectionNo = 1;
    } else if (sectionId.innerHTML === "+") {
        sectionNo = parseInt(sectionId.id.split('-')[2]);
        sectionNo++;
        sectionId.innerHTML = "-";
    } else {
        let section = parseInt(sectionId.id.split('-')[2]);
        document.getElementById(`section-row-${section}`).innerHTML = "";
        return;
    }
    const newSection = document.createElement('div');
    newSection.className = 'row';
    newSection.id = `section-row-${sectionNo}`;
    newSection.innerHTML = `
        <div class="input-content">
            <div class="col">
                <label>Section-${sectionNo}</label>
            </div>
            <div class="col">
                <div class="row align-items-center ">
                    <div class="col-7">
                        <input id="section-${sectionNo}" class="input form-control" type="text" placeholder="Enter section title">
                    </div>
                    <div class="col-3 p-0">
                        <button type="button" class="showmodal" onClick="showModal('modal-add-sub-section',this.id)" data-show-modal="modal-add-sub-section" id="btn-subsection-${sectionNo}">Sub-Section</button>
                    </div>
                    <div class="col-2"> 
                        <button id="btn-section-${sectionNo}" class="btn-plus" type="button" onClick="addSection(this)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("add-new-section").appendChild(newSection);

}

let myModal;
function showModal(modalId, sectionId) {

    const modalElement = document.getElementById(modalId);
    myModal = new bootstrap.Modal(modalElement);
    myModal.show();
    no = sectionId;
    number = no.split("-")[2];
    document.getElementById("section-no").innerHTML = `Add Sub-Section under main Section-${number}`;
    if(sectionId.includes("sub")){
        mainSection();
    }
    else if(sectionId.includes("child")){
        subSection(sectionId);
    }


}
function mainSection() {
    alert(sectionNo);
    let sectionData = {
        title: document.getElementById(`section-${sectionNo}`).value,
        subSections: []
    };
    bookData.sections.push(sectionData);
    console.log(bookData.sections);
}
function subSection(sectionId) {

   
    let x = sectionId.split('-')[3];
    alert(x);
    
    let parentSection = bookData.sections;
    if (parentSection) {
        let subSectionData = {
            title: document.getElementById(`sub-section-${x}`).value,
            children: []
        };
        parentSection.subSections.push(subSectionData);
    }
    console.log(parentSection.subSections);
}
function child(){
    let parentSubSection = bookData.sections[parseInt(sectionId.id.split('-')[3]) - 1]
    .subSections[parseInt(sectionId.id.split('-')[3]) - 1];
}

const closeAddBookModal = document.getElementById("add-book-close");
closeAddBookModal.addEventListener("click", () => {
    document.getElementById("form-add-book").reset();
    document.getElementById("add-new-section").innerHTML = "";
    addSection();
    // closeModal("modal-add-book");
});

// +++++++++++++++++  SUB SECTION +++++++++++++++++++ 

addSubSection();

function addSubSection(sectionId) {

    if (!sectionId) {
        subSectionNo = 1;
    } else if (sectionId.innerHTML === "+") {
        subSectionNo = parseInt(sectionId.id.split('-')[3]);
        subSectionNo++;
        sectionId.innerHTML = "-";

    } else if ((sectionId.innerHTML === "-")) {
        let section = parseInt(sectionId.id.split('-')[3]);
        document.getElementById(`sub-section-row-${section}`).innerHTML = "";
        return;
    }

    const newSection = document.createElement('div');
    newSection.className = 'row';
    newSection.id = `sub-section-row-${subSectionNo}`;
    newSection.innerHTML = `
        <div class="input-content">
            <div class="col">
                <label>Sub-Section</label>
            </div>
            <div class="col">
                <div class="row align-items-center ">
                    <div class="col-7">
                        <input id="sub-section-${subSectionNo}" class="input form-control" type="text" placeholder="Sub section">
                    </div>
                    <div class="col-3 p-0">
                        <button type="button" class="show-child" data-show-modal="modal-child" onClick="showModal('modal-child',this.id)" id="btn-add-child-${subSectionNo}">Add-Child</button>
                    </div>
                    <div class="col-2"> 
                        <button id="btn-sub-section-${subSectionNo}" class="btn-plus" type="button" onClick="addSubSection(this)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("add-new-sub-section").appendChild(newSection);

    const subSectionTitle = document.getElementById(`sub-section-${subSectionNo}`).value;

}

const closeSubSection = document.getElementById("sub-section-close");
closeSubSection.addEventListener("click", () => {

    document.getElementById("form-sub-section").reset();
    document.getElementById("add-new-sub-section").innerHTML = "";
    addSubSection();

});

// +++++++++++++++++  CHILD SECTION +++++++++++++++++++ 

addChild();
function addChild(sectionId) {
    if (!sectionId) {
        childNo = 1;
    } else if (sectionId.innerHTML === "+") {
        childNo = parseInt(sectionId.id.split('-')[3]);
        childNo++;
        sectionId.innerHTML = "-";

    } else if ((sectionId.innerHTML === "-")) {
        let section = parseInt(sectionId.id.split('-')[3]);
        document.getElementById(`child-section-row-${section}`).innerHTML = "";
        return;
    }
    const newSection = document.createElement('div');
    newSection.className = 'row';
    newSection.id = `child-section-row-${childNo}`;
    newSection.innerHTML = `
        <div class="input-content">
            <div class="col">
                <label>Sub-Section</label>
            </div>
            <div class="col">
                <div class="row align-items-center ">
                    <div class="col-7">
                        <input id="child-section-${childNo}" class="input form-control" type="text" placeholder="Sub section">
                    </div>
                    <div class="col-2"> 
                        <button id="btn-child-section-${childNo}" class="btn-plus" type="button" onClick="addChild(this)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("add-new-child").appendChild(newSection);
}

const closeChild = document.getElementById("child-section-close");
closeChild.addEventListener("click", () => {

    document.getElementById("form-child").reset();
    document.getElementById("add-new-child").innerHTML = "";
    addChild();
});

// ############   SAVE MODAL DATA  ############

const saveModalData = document.getElementById("form-add-book");
let mainModal = new bootstrap.Modal(document.getElementById("modal-add-book"));
saveModalData.addEventListener("submit", (event) => {
    event.preventDefault();

    const getTotalSections = document.getElementById("add-new-section");
    const inputElements = getTotalSections.querySelectorAll("input");

    bookData.bookName = document.getElementById("book-title").value;
    inputElements.forEach((input) => {
        input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
        });
        if (input.value) {
            alert("Parent Save Data");
        }
        else {
            input.classList.add("is-invalid");
        }
    })
    mainModal.hide();
});

const fetchSubSectionData = document.getElementById("form-sub-section");

let subModal = new bootstrap.Modal(document.getElementById("modal-add-sub-section"));

fetchSubSectionData.addEventListener("submit", (event) => {
    event.preventDefault();

    const getTotalSections = document.getElementById("add-new-sub-section");
    const inputElements = getTotalSections.querySelectorAll("input");

    inputElements.forEach((input) => {
        input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
        });
        if (input.value) {
            alert("save sub data");
            let arr = [];
            arr.push(input.value);
            console.log("Sub sections data:  " + arr)
        }
        else {
            input.classList.add("is-invalid");
        }
    })
    subModal.hide();
});

const fetchChildData = document.getElementById("fetch-child-data");

let childModal = new bootstrap.Modal(document.getElementById("modal-child"));

fetchChildData.addEventListener("click", (event) => {
    event.preventDefault();
    const getTotalSections = document.getElementById("add-new-child");
    const inputElements = getTotalSections.querySelectorAll("input");

    inputElements.forEach((input) => {
        input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
        });
        if (input.value) {
        }
        else {
            input.classList.add("is-invalid");
        }
    })
});
