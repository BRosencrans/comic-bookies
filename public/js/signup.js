document.querySelector("#signupForm").addEventListener("submit",e=>{
    e.preventDefault();
    const signupObj = {
        email:document.querySelector("#signupEmail").value,
        username:document.querySelector('#signup-username').value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(signupObj)

    fetch("/api/users/signup",{
        method:"POST",
        body:JSON.stringify(signupOnbj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})