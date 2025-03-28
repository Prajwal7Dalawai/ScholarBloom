const fetchUniData = async()=>{
    let response = await fetch("http://localhost:3000/uni/",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        credentials: "include",
    });
    let data = await response.json();
    return data;
}
export {fetchUniData};