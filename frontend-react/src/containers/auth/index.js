export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("authUser")) {
        return JSON.parse(localStorage.getItem("authUser"));
    } else {
        return false;
    }
};

export const isAuthorized = profileId => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("authUser")) {
    	let userId= JSON.parse(localStorage.getItem("authUser"))._id;
    	if (userId === profileId) return true;
    	else return false;

    } else {
        return false;
    }
};