import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithRedirect, updateEmail, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getStorage, ref,uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHKaiAqQiJw3cPOKr-Nxb5NDY3yIULzr0",
    authDomain: "pixelprimefrv.firebaseapp.com",
    projectId: "pixelprimefrv",
    storageBucket: "pixelprimefrv.appspot.com",
    messagingSenderId: "729925978316",
    appId: "1:729925978316:web:4d7f1dece94ec6271cda69",
    measurementId: "G-9Q5XR393LM"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

var pixelsPerRow = 500;
var pixelsPerColumn = 500;

var startingX = 0;
var startingY = 0;
var endingX = 0;
var endingY = 0;

var occupiedPixels = [];

const timer = ms => new Promise(res => setTimeout(res, ms));

async function loadPixels() {
    for(var i = 0; i < pixelsPerRow; i++) {
        var column = document.createElement('div');
        column.className = 'column';
        column.style.gridTemplateColumns = 'repeat(' + pixelsPerColumn + ', ' + '15px)';
        for(var j = 0; j < pixelsPerColumn; j++) {
            var pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.id = 'pixel-' + j + '-' + i;
            if(occupiedPixels.includes(pixel.id)) {
                pixel.classList.add('unavailable');
            } else {
                pixel.onclick = function() {
                    if(this.classList.contains('active')) {
                        this.classList.remove('active');
                    } else {
                        this.classList.add('active');
                    }
                    var selectedPixelsArray = document.getElementsByClassName('active');
                    document.getElementById('selectedPixelsValue').innerText = selectedPixelsArray.length;

                    var xCordinates = [];
                    var yCordinates = [];
                    for(var i = 0; i < selectedPixelsArray.length; i++) {
                        xCordinates.push(parseInt(selectedPixelsArray[i].id.split('-')[1]));
                        yCordinates.push(parseInt(selectedPixelsArray[i].id.split('-')[2]));
                    }

                    startingX = Math.min(...xCordinates);
                    startingY = Math.min(...yCordinates);
                    endingX = Math.max(...xCordinates);
                    endingY = Math.max(...yCordinates);

                    var incosistentPixels = false;
                    for(var i = startingX; i <= endingX; i++) {
                        for(var j = startingY; j <= endingY; j++) {
                            if(!document.getElementById('pixel-' + i + '-' + j).classList.contains('active')) {
                                incosistentPixels = true;
                                break;
                            }
                        }
                    }
                    if(incosistentPixels) {
                        document.getElementById('select-img-btn').style.display = 'none';
                        document.getElementById('inconsistente').style.display = 'block';
                    } else if(selectedPixelsArray.length > 0) {
                        document.getElementById('select-img-btn').style.display = 'block';
                        document.getElementById('inconsistente').style.display = 'none';
                    } else {
                        document.getElementById('select-img-btn').style.display = 'none';
                        document.getElementById('inconsistente').style.display = 'none';
                    }
                };
            }
            column.appendChild(pixel);
        }
        document.getElementById('pixel-canvas').appendChild(column);
        if(i > 500) {
            await timer(50);
        } else {
            await timer(0.1);
        }
    }
}

window.onload = setTimeout(async function() {
    document.getElementById('content').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
    var savedImagesArray = [];
    await getDocs(collection(db, "images")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().savedImages != null && doc.data().savedImages != undefined) {
                savedImagesArray = doc.data().savedImages;
            }
        });
    });
    for(var i = 0; i < savedImagesArray.length; i++) {
        var docRef = doc(db, "images", savedImagesArray[i]);
        await getDownloadURL(ref(storage, "images/" + savedImagesArray[i])).then(async (url) => {
            var image = document.createElement('img');
            image.src = url;
            image.classList.add('saved-image');
            await getDoc(doc(db, "images", savedImagesArray[i])).then((doc) => {
                if (doc.exists()) {
                    image.style.top = (doc.data().startingY * 2) + 'px';
                    image.style.left = (doc.data().startingX * 2) + 'px';
                    image.style.width = ((doc.data().endingX * 2) - (doc.data().startingX * 2) + 2) + 'px';
                    image.style.height = ((doc.data().endingY * 2) - (doc.data().startingY * 2) + 2) + 'px';
                    document.getElementById('preview').appendChild(image);
                    console.log("Document data:", doc.data());
                    for(var i = doc.data().startingX; i <= doc.data().endingX; i++) {
                        for(var j = doc.data().startingY; j <= doc.data().endingY; j++) {
                            occupiedPixels.push("pixel-" + i + "-" + j);
                        }
                    }
                } else {
                    console.log("No such document!");
                }
            });
        });
    }
    await loadPixels();
}, 500);

window.changeZoom = async() => {
    document.getElementById("preview").style.display = "none";
    document.getElementById("change-zoom").style.display = "none";
    setTimeout(async function() {   
        document.getElementById("pixel-canvas-container").style.display = "block";
    }, 500);
}


window.buyPixels = () => {
    document.getElementById('buy-popup').style.display = 'flex';
    document.getElementById('content').style.filter = 'blur(5px)';
}

window.preview = () => {
    document.getElementById("pixel-canvas-container").style.display = "none";
    document.getElementById('buy-popup').style.display = 'none';
    var image = document.createElement('img');
    image.classList.add('overlay-image');
    image.style.top = startingY * 2 + 'px';
    image.style.left = startingX * 2 + 'px';
    image.style.width = ((endingX * 2) - (startingX * 2) + 2) + 'px';
    image.style.height = ((endingY * 2) - (startingY * 2) + 2) + 'px';
    var files = document.getElementById('file').files;
        
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            image.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

    document.getElementById('preview').appendChild(image);
    document.getElementById('preview').style.display = 'block';
    document.getElementById('content').style.filter = 'none';
    document.getElementById("change-zoom").style.display = "none"
    document.getElementById("select-img-btn").style.display = "none";
    document.getElementById('checkout-btn').style.display = 'flex';
}

window.signInEmail = () => {signInWithEmailAndPassword(auth, document.getElementById("email").value, document.getElementById("senha").value)
.then((userCredential) => {
    const user = userCredential.user;
})
.catch((error) => {
    incorrectLogin();
});}

auth.onAuthStateChanged(async function(user) {
    if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementById("selected-pixels").style.display = "flex";
        document.getElementById("login-page-btn").style.display = "none";

        window.checkout = async () => {
            console.log(document.getElementById("checkout-btn"));
            document.getElementById("checkout-btn").innerHTML = "<div class='loaderBtn'></div>Proceder ao CheckOut";
            var savedImagesArray = [];
            await getDocs(collection(db, "images")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().savedImages != null && doc.data().savedImages != undefined) {
                        savedImagesArray = doc.data().savedImages;
                    }
                });
            });
            await addDoc(collection(db, "images"), {
                startingX: startingX,
                startingY: startingY,
                endingX: endingX,
                endingY: endingY,
                created_at: new Date(),
                user: user.uid
            }).then(async function(docRef) {
                savedImagesArray.push(docRef.id);
                await updateDoc(doc(db, "images", "index"), {
                    savedImages: savedImagesArray
                });
                var file = document.getElementById('file').files[0];
                var storageRef = ref(storage, "images/" + docRef.id);
                uploadBytes(storageRef, file).then((snapshot) => {
                    location.reload();
                });
            });
        }
    } else {
        document.getElementById("login-page-btn").style.display = "block";
    }
});

window.showLoginPage = () => {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('content').style.display = 'none';
}

// signOut(auth).then(() => {
//     //location.reload();
// }).catch((error) => {
//     console.log(error);
// });

window.googleSignIn = () => {signInWithPopup(auth, provider).then((result) => {location.reload()}).catch((error) => {console.log(error)})};