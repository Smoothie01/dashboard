const initAuth = () => {
    return window.gapi.auth2.init({
        client_id: "934967892332-2gcg3bomvcn99dc3sekkfq0fohvbv76m.apps.googleusercontent.com", //paste your client ID here
        scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
};

export const checkSignedIn = () => {
    return new Promise((resolve, reject) => {
        initAuth() //calls the previous function
            .then(() => {
                const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
                resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};
export const onFailure = (error) => {
    console.log('onFailure')
    console.error(error);
};
