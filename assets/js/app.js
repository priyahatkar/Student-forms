console.log("hello world!");

const cl = console.log;

const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const stdContainer = document.getElementById("stdContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

let stdArray = [];

stdArray = JSON.parse(localStorage.getItem('stdData')) ?? [];

const onEdit =(ele) =>{
    // cl(ele.closest("tr").getAttribute("id"));
    let editId = ele.closest("tr").getAttribute("id");
    localStorage.setItem("editId", editId);
    let editObj = stdArray.find(std => std.id === editId);
    cl(editObj);
    fnameControl.value = editObj.fname;
    lnameControl.value = editObj.lname;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact

    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}

const onDelete =(ele) =>{
    // cl("onDelete");
    let deleteId = ele.closest("tr").id;
    // cl(deleteId)

    let deleteIndex = stdArray.findIndex(std => std.id === deleteId);
    // cl(deleteIndex);
    stdArray.splice(deleteIndex,1);
    localStorage.setItem("stdData", JSON.stringify(stdArray));
    templating(stdArray)

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Form Deleted Successfully...!!!',
        showConfirmButton: false,
        timer: 3000
    })
}

const templating = (arr) => {  
    let result = "";

    arr.forEach((std,i)=>{
        result += `
                <tr id="${std.id}">
                    <td>${i + 1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td> 
                    <td>
                        <button class="btn btn-primary" onclick ="onEdit(this)">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick ="onDelete(this)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>

                </tr>
            `
    });
    stdContainer.innerHTML= result;
}

// if(localStorage.getItem("stdData")){
//     stdArray = JSON.parse(localStorage.getItem('stdData'));
// }

// stdArray = JSON.parse(localStorage.getItem('stdData'))|| [];

// cl(stdArray)
templating(stdArray);



let onAddStd = (eve) =>{
    eve.preventDefault();
    let stdObj = {
        fname : fnameControl.value,
        lname : lnameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        id : generateUuid()
    }
    eve.target.reset();
    stdArray.push(stdObj)
    localStorage.setItem("stdData",JSON.stringify(stdArray));
    templating(stdArray);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Form has been saved',
        showConfirmButton: false,
        timer: 3000
    })
    
}

const onStdUpdate = () => {
    let updatedId = localStorage.getItem("editId");
    stdArray.forEach(obj =>{
        if(obj.id === updatedId){
            obj.fname = fnameControl.value;
            obj.lname = lnameControl.value;
            obj.email = emailControl.value;
            obj.contact = contactControl.value;
        }
    })
    localStorage.setItem("stdData", JSON.stringify(stdArray));
    templating(stdArray);
    stdForm.reset();
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Form has been successfully Updated!',
        showConfirmButton: false,
        timer: 3000
    })
}

stdForm.addEventListener("submit",onAddStd);
updateBtn.addEventListener("click",onStdUpdate);