const fetchUniData = async()=>{
    let response = await fetch("https://scholarbloom-backend-142097269177.asia-south1.run.app/uni/",
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