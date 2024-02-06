// Setzt let's und lädt alle späteren Funktionen auf Laden der Seite
document.addEventListener('DOMContentLoaded', function () {
    let inputFeld = document.getElementById('inputFeld');
    let addKnopf = document.getElementById('addKnopf');
    let ausgabeListe = document.getElementById('ausgabeListe');
    let deleteAll = document.getElementById('deleteAll');

    window.onload = function() {
        alert('Nach hinzufügen von Einträgen werden diese auf Knopfdruck wieder gelöscht. Mit dem Mülleimer löscht man alle Einträge.');
    };

    // Funktion, um Cookies zu setzen
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
    }

    // Funktion, um den Wert der Cookies zu lesen
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Funktion, um die gesamte Liste zu sammeln und als Cookie zu speichern
    function saveListAsCookie() {
        let eintragsArray = [];
        document.querySelectorAll('#ausgabeListe p').forEach(function (item) {
            eintragsArray.push(item.innerText);
        });

        let eintragsString = JSON.stringify(eintragsArray);
        setCookie('toDoListEinträge', eintragsString, 365); // Speichert den Wert für 365 Tage
    }

    // Funktion, um die Liste beim Laden der Seite wiederherzustellen
    function loadListFromCookie() {
        let eintragsString = getCookie('toDoListEinträge');
        if (eintragsString) {
            let eintragsArray = JSON.parse(eintragsString);
            eintragsArray.forEach(function (itemText) {
                let listenEintrag = document.createElement('p');
                listenEintrag.innerText = itemText;
                ausgabeListe.appendChild(listenEintrag);
            });
        }
    }

    // Lädt die Liste beim Laden der Website
    loadListFromCookie();

    // Fügt den eingegebenen Listeneintrag auf Plus-Button hinzu
    addKnopf.addEventListener('click', function () {
        let listenEintrag = document.createElement('p');

        if (inputFeld.value !== '') {
            listenEintrag.innerText = inputFeld.value;
            ausgabeListe.appendChild(listenEintrag);

            saveListAsCookie();

            inputFeld.value = '';
        }
    });

    // Fügt den eingegebenen Listeneintrag auf Enter-Taste hinzu
    inputFeld.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Verhindere das Standardverhalten
            addKnopf.click(); // Simuliere einen Klick auf den Add-Button
        }
    });

    // Gedrückter Listeneintrag wird wieder entfernt
    ausgabeListe.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'P') {
            ausgabeListe.removeChild(e.target);
            saveListAsCookie();
        }
    });

    // Alle Listeneinträge löschen
    deleteAll.addEventListener('click', function () {
        document.querySelectorAll('#ausgabeListe > p').forEach(n => n.remove());
        saveListAsCookie();
    });
});
