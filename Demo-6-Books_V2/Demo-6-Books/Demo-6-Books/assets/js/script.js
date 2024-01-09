const authorData = JSON.parse(localStorage.getItem('authors')) || [];
const booksData = JSON.parse(localStorage.getItem('booksData')) || [];
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const loggedUser = localStorage.getItem("loggedUser");
const homePage = document.getElementById("home-page");
const logout = document.getElementById("btn-logout");
const modalChangePassword = document.getElementById("modal-change-password");
let subSectionNo = 0;
let childNo = 0;
let no;
let authorName, authorId, role;
let childData = [];
let childDataObject;

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
        window.location.href = "login.html";
    }
    else {
        authorData.forEach(findUserEmail => {
            if (loggedUser === findUserEmail.authorEmail) {
                authorName = findUserEmail.authorName;

                authorId = findUserEmail.id;
                role = (findUserEmail.role).toLowerCase();
                let initial = authorName.charAt(0).toUpperCase();
                document.getElementById("btn-initials").innerText = `${initial}`;
            }
        });
        displayData();
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
    const changePasswordModal = new bootstrap.Modal(document.getElementById("modal-change-password"));
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
                        changePasswordModal.hide();
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
let section, subSection, child;
let sectionDataObject, subSectionObject;
let childCounter = 1;

const BooksData = {
    author: "",
    authorId: "",
    bookName: "",
    bookId: "",
    sections: []
};
if (homePage) {
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
                            <input id="section-${sectionNo}" class="input inputSection form-control" type="text" placeholder="Enter section title">
                        </div>
                        <div class="col-3 p-0">
                            <button type="button" class="showmodal" onClick="showModal('modal-add-sub-section',this.id)" id="btn-subsection-${sectionNo}">Sub-Section</button>
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

    let subModal, childModal;
    let SubSectionID;
    function showModal(modalId, sectionId) {

        no = sectionId;
        SubSectionID = sectionId;
        number = no.split("-")[2];

        document.getElementById("section-no").innerHTML = `Add Sub-Section under main Section-${number}`;
        if (modalId === "modal-add-sub-section") {
            subModal = new bootstrap.Modal(document.getElementById(modalId));
            subModal.show();
            sectionDataObject = jsonAddSection(number);

        }
        else if (modalId === "modal-child") {
            childModal = new bootstrap.Modal(document.getElementById(modalId));
            childModal.show();
            subSectionObject = jsonAddSubsection(sectionDataObject, sectionId);

        }
    }

    let subSectionClicked, childSectionClicked;
    function jsonAddSection(sectionNo) {
        let sectionName = document.getElementById(`section-${sectionNo}`).value;
        subSectionClicked = sectionNo;
        section = {
            sectionId: sectionNo,
            sectionName,
            subsections: []
        };
        BooksData.sections.push(section);
        return section;

    }
    function jsonAddSubsection(sectionDataObject, sectionId) {
        if (sectionId.includes("-")) {
            if (sectionId.split('-').length == 4)
                childSectionClicked = sectionId.split('-')[3];
            if (sectionId.split('-').length == 3)
                childSectionClicked = sectionId.split('-')[2];
        }
        else {
            childSectionClicked = sectionId;
        }
        let subSectionName = document.getElementById(`sub-section-${childSectionClicked}`).value;
        subSection = {
            subSectionId: childSectionClicked,
            subSectionName,
            children: []
        };

        sectionDataObject.subsections.push(subSection);

        return subSection;
    }
    function jsonAddChild(subSectionObject, childName) {
        const childId = childCounter++;
        child = {
            childId,
            childName,
            children: []
        };
        subSectionObject.children.push(child);

        return child;
    }

    const closeAddBookModal = document.getElementById("add-book-close");
    closeAddBookModal.addEventListener("click", () => {
        document.getElementById("form-add-book").reset();
        document.getElementById("add-new-section").innerHTML = "";
        addSection();
    });

    // =================================================

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
                            <input id="sub-section-${subSectionNo}" class="input inputSubSection form-control" type="text" placeholder="Sub section">
                        </div>
                        <div class="col-3 p-0">
                            <button type="button" class="show-child" onClick="showModal('modal-child',this.id)" id="btn-add-child-${subSectionNo}">Add-Child</button>
                        </div>
                        <div class="col-2"> 
                            <button id="btn-sub-section-${subSectionNo}" class="btn-plus" type="button" onClick="addSubSection(this)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("add-new-sub-section").appendChild(newSection);

        document.getElementById(`sub-section-${subSectionNo}`).value;
    }

    const closeSubSection = document.getElementById("sub-section-close");
    closeSubSection.addEventListener("click", () => {

        closeSub();

    });
    function closeSub() {
        document.getElementById("form-sub-section").reset();
        document.querySelector("#add-new-sub-section").innerHTML = "";
        addSubSection();
    }

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
                    <label>Child-Section</label>
                </div>
                <div class="col">
                    <div class="row align-items-center ">
                        <div class="col-7">
                            <input id="child-section-${childNo}" class="input childInput form-control" type="text" placeholder="Child section">
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
        closeChildSection();

    });
    function closeChildSection() {
        document.getElementById("form-child").reset();
        document.getElementById("add-new-child").innerHTML = "";
        addChild();
    }


    // ############   SAVE MODAL DATA  ############

    function formValidation(inputFields, bookTitle) {
        let inputValues = [];
       
        if (bookTitle) {
            bookTitle.addEventListener("input", () => {
                bookTitle.classList.remove("is-invalid");
            });
        }
        
        for (let i = 0; i < inputFields.length; i++) {
            
            inputFields[i].addEventListener("input", () => {
                inputFields[i].classList.remove("is-invalid");
            });
            if (bookTitle) {
                if (inputFields[i].value && bookTitle.value) {
                    inputValues[i] = inputFields[i].value;
                }
                else{
                    if (!inputFields[i].value) {
                        inputFields[i].classList.add("is-invalid");
    
                    }
                    if (bookTitle) {
                        if (!bookTitle.value) {
                            bookTitle.classList.add("is-invalid");
                        }
                    }
                }
            }
            if (!bookTitle) {
                if (inputFields[i].value) {
                    
                    inputValues[i] = inputFields[i].value;
                }
                else {
                    if (!inputFields[i].value) {
                        inputFields[i].classList.add("is-invalid");
    
                    }
                }
            }
        }
        return inputValues;
    }

    const saveModalData = document.getElementById("form-add-book");
    let modal = new bootstrap.Modal(document.getElementById("modal-add-book"));
    saveModalData.addEventListener("submit", (event) => {

        event.preventDefault();
        const bookTitle = document.getElementById("book-title");
        const inputFields = document.querySelectorAll(".inputSection");
        let inputValues = formValidation(inputFields, bookTitle);;

        bookName = document.getElementById("book-title").value;
        const bookId = Math.floor(Math.random() * 100);

        BooksData.author = authorName;
        BooksData.authorId = authorId;
        BooksData.bookName = bookName;
        BooksData.bookId = bookId;
        booksData.push(BooksData);

        if (BooksData.sections.length == 0 && inputValues.length > 0) {
            for (let i = 1; i <= inputFields.length; i++) {
                jsonAddSection((i).toString());
            }
        }
        if (inputFields.length === inputValues.length) {
            for (let i = 1; i <= inputFields.length; i++) {
                BooksData.sections.forEach(id => {
                    var IsPresent = checkDuplicateSectionArray(i, BooksData);
                    if (IsPresent == "Absent") {
                        jsonAddSection((i).toString());
                    }

                });
            }
            localStorage.setItem("booksData", JSON.stringify(booksData));
            alert("Saved data successfully");
            displayData();
            modal.hide();
            clearData();
        }

    });

    function clearData() {
        location.reload();
    }
    function checkDuplicateSectionArray(value, array) {
        var status = 'Absent';
        for (var i = 0; i < array.sections.length; i++) {
            var name = array.sections[i].sectionId;
            if (name == value) {
                status = 'Present';
                break;
            }
        }
        return status;
    }

    function checkDuplicateSUBSectionArray(value, array) {
        var status = 'Absent';
        for (var i = 0; i < array.subsections.length; i++) {
            var name = array.subsections[i].subSectionId;
            if (name == value) {
                status = 'Present';
                break;
            }
        }
        return status;
    }

    const fetchSubSectionData = document.getElementById("form-sub-section");

    fetchSubSectionData.addEventListener("submit", (event) => {

        event.preventDefault();

        const inputFields = document.querySelectorAll(".inputSubSection");
        let inputValues = formValidation(inputFields, "");;
     
        if (inputFields.length === inputValues.length) {

            for (let i = 1; i <= inputFields.length; i++) {
                var IsPresent = checkDuplicateSUBSectionArray(i, sectionDataObject);
                if (IsPresent == "Absent") {
                    jsonAddSubsection(sectionDataObject, "btn-subsection-" + i);

                }
            }

            alert("Sub-Section Data Added successfully");
            closeSub();
            subModal.hide();
        }
     
    });


    const fetchChildData = document.getElementById("form-child");
    fetchChildData.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputFields = document.querySelectorAll(".childInput");
        let inputValues = [];

        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].addEventListener("input", () => {
                inputFields[i].classList.remove("is-invalid");
            });

            if (inputFields[i].value) {
                inputValues[i] = inputFields[i].value;
                jsonAddChild(subSectionObject, inputValues[i]);

            }
            else {
                if (!inputFields[i].value) {
                    inputFields[i].classList.add("is-invalid");
                }
            }
        }
        if (inputFields.length === inputValues.length) {
            alert("Child data stored");
            closeChildSection();
            childModal.hide();
        }
    });

    // DISPLAY DATA IN TABLE
    let bookName, currentAuthor, currentId, totalSections = 0, totalChildSection = 0, totalSubSection = 0, bookId;
    function displayData() {

        document.getElementById("table-body").innerHTML = "";
        const storedItems = JSON.parse(localStorage.getItem("booksData"));
        let childLength = 0, subLength = 0;
        if (storedItems) {
            storedItems.forEach(item => {
                totalSections = item.sections.length;
                item.sections.forEach(sub => {
                    totalSubSection = sub.subsections.length;
                    sub.subsections.forEach(child => {
                        totalChildSection = child.children.length;
                    });
                });

                bookName = item.bookName;
                currentId = item.authorId;
                bookId = item.bookId;
                if (role === "admin") {
                    displayBooksData();
                }
                else {
                    if (authorId === item.authorId) {
                        displayBooksData();
                    }
                }
            });
        }
    }
    function displayBooksData() {
        if (authorData) {
            authorData.forEach(data => {
                if (currentId === data.id) {
                    currentAuthor = data.authorName;
                }
            });
        }
        document.getElementById("table-body").innerHTML +=
            `<tr id="table-row">
                  <td>${bookName}</td>
                  <td>${currentAuthor}</td>
                  <td>${totalSections}</td>
                  <td>${totalSubSection}</td>
                  <td>${totalChildSection}</td>
                  <td class="actions">
                    <button class="btn-view-delete" onClick="viewBook(${bookId})"  data-bs-toggle="modal" data-bs-target="#modal-view-book"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-view-delete" onClick="deleteRecord(${bookId})"><i class="fa-regular fa-trash-can "></i></button>
                  </td>
              </tr>`
    }
    function viewBook(selectedId) {
        document.getElementById("view-modal-content").innerHTML = "";
        const storedItems = JSON.parse(localStorage.getItem("booksData"));
        storedItems.forEach(item => {
            if (item.bookId === selectedId) {
                document.getElementById("modal-book-title").innerText = item.bookName;

                const viewModalContent = document.getElementById("view-modal-content");
                viewModalContent.innerHTML = "";
                item.sections.forEach(sec => {

                    const mainSection = document.createElement("li");
                    mainSection.innerHTML = `<b>Main Section:</b> ${sec.sectionName}`;

                    const subSectionsList = document.createElement("ul");
                    sec.subsections.forEach(sub => {
                        const subSection = document.createElement("li");
                        subSection.innerHTML = `<b>Sub Section:</b> ${sub.subSectionName}`;

                        const childrenList = document.createElement("ul");
                        sub.children.forEach(child => {
                            const childSection = document.createElement("li");
                            childSection.innerHTML = `<b>Child Section:</b> ${child.childName}`;

                            childrenList.appendChild(childSection);
                        });

                        subSection.appendChild(childrenList);
                        subSectionsList.appendChild(subSection);
                    });

                    mainSection.appendChild(subSectionsList);
                    viewModalContent.appendChild(mainSection);
                });
            }
        });
    }
    
    function deleteRecord(selectedId) {
        const storedItems = JSON.parse(window.localStorage.getItem('booksData'));
        let confirmDelete = "Are you sure you want to delete this Employee?";
        if (confirm(confirmDelete)) {
            for (var i = 0; i < storedItems.length; i++) {
                if (storedItems[i].bookId === selectedId) {
                    storedItems.splice(i, 1);
                    alert("Deleted books record")
                    localStorage.setItem("booksData", JSON.stringify(storedItems));
                }
            }
            displayData();
        }
    }
}

