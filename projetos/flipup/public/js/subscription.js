import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"

window.stripeReady = () => {

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCAUtT057uGDE0W7uK2RV5mGaJsR6ySAsA",
        authDomain: "flipup-b861e.firebaseapp.com",
        projectId: "flipup-b861e",
        storageBucket: "flipup-b861e.appspot.com",
        messagingSenderId: "816504951931",
        appId: "1:816504951931:web:b37b800555b2b45b9dfede"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    auth.useDeviceLanguage();
    
    auth.onAuthStateChanged(user => {
        if(!user) {
            window.location.href = "https://flipup.app.br/index.html";
        }

        var stripe = Stripe('pk_test_51PL7unI3KN8Sdb14bDtuu9RoLxaeVHvR8Pnt2R10UPfYQaNEb3D1VYnT0LugSSYnIvvum28Tr3q3PzVoKskP2pyX00KWy0C3m6');


        window.buySubscriptionFlipUp = (mode) => {
            var selectedPrice;
            if(mode == 0) {
                selectedPrice = 'price_1PNP8YI3KN8Sdb14q84PswxX';
            } else {
                selectedPrice = 'price_1PNP8YI3KN8Sdb14iI1Yu0VI';
            }
            stripe.redirectToCheckout({
                lineItems: [
                    {
                        price: selectedPrice,
                        quantity: 1
                    }
                ],
                mode: "subscription",
                customerEmail: auth.currentUser.email,
                successUrl: "https://flipup.app.br/?p=conta",
                cancelUrl: "https://flipup.app.br/?p=conta"
            })
        };
    })
}