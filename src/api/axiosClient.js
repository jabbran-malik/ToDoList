import axios from "axios";

export const  axiosClient=axios.create({
    baseURL:"https://dummyjson.com",
    headers: {
        "Ccontent-Type" : "application/json"
    },

});

// change api baseurl in on place
// add auth header later
// add interceptors (logging , token refresh )
// axios ek javascript library hai 
// backend sy api se data leta hy (get )
// or backend ko data behjna (post,put,delete)
// axios >> frontend ka messenger hau jo server sy baat krta ha in easy wordss