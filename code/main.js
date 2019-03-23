$("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1000, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });

    } // End if

});



// הגדרת משתנה ראשי
var map;
var maps;

function loadjsn() {


    $.getJSON("./json/maps.json", function (json) {
        maps = json;
        console.log('Json ready');

        initMap();
    });

}

//פונקציה ראשית למציאת מקום המשתמש (אם מופעל שירותי מיקום
function initMap() {

    console.log('mapstart');

    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('found location');
                var myLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setPos(myLocation);
            });
        }
        //שלא מופעל מיקום אם יש שגיאה (כנראה בשירות הגאולוקציה)  
        catch (err) {
            var myLocation = {
                lat: maps.mapsetting.lat,
                lng: maps.mapsetting.lng
            };
            setPos(myLocation);
        }
    } else {
        var myLocation = {
            lat: maps.mapsetting.lat,
            lng: maps.mapsetting.lng
        };
        setPos(myLocation);
    }
}
//מיקוד ספציפי לפי הGEOLOCATION שנמצא קודם בזום 10
function setPos(myLocation) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: maps.mapsetting.zoom
    });
    //שירותי PLACES בגוגל API
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLocation,
        radius: maps.mapsetting.radius,
        //למצוא מיקומים קרובים ברדיוס 3000 מסוג 'בתי חולים'
        types: [maps.mapsetting.type]
    }, processResults);

}
//יצירת מרקרים לכל אזור נמצא בעזרת קריאה לפונקציה CREATEMARKERS
function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);

    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');

    //הגדרות האייקון עצמו
    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        //אנימציה ו- הגדרות המרקר
        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location
        });
        //להראות פיסת אדמה גדולה יותר לפי המקומות שנמצאו
        bounds.extend(place.geometry.location);
    }
    //לוודא שהכל נכנס בחלון
    map.fitBounds(bounds);
}


//מאפשר אלמנטים בפרלקס

$("#blood-cell-blurred-left").paroller({
    factor: 1.0,
    factorxs: 1.0,
    type: 'foreground',
    direction: 'vertical'
});

$("#blood-cell-blurred-right").paroller({
    factor: 1.0,
    factorxs: 1.0,
    type: 'foreground',
    direction: 'vertical'
});


//סוגר את התפריט בלחיצה על לינק

$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

// עושה שהגלילה תהיה חלקה יותר - משנה את הנראות של הסקרול-בר

$(document).ready(function () {

        $("html").niceScroll({
            cursorcolor: "lightgray",
            cursorborder: "none",
            horizrailenabled: false,
            background: "none",
            zindex: [1040],
            mousescrollstep: 60,
        });

    }

);