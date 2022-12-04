var pagina = 1;
var cargado = true;

window.onload = () => {
    let buscar = document.getElementById("busca");
    buscar.addEventListener("click", buscaEvent); ''

    let titulo = document.getElementById("titulo");
    titulo.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            buscar.click();
        }
    });

    window.addEventListener('scroll', () => {
        if (
            window.scrollY - 400 + window.innerHeight >= document.body.offsetHeight - 1000
        ) {
            requestLista();
        }
    });
}

function buscaEvent() {
    document.getElementById("peliculas").innerHTML = "";
    requestLista();
}

function requestLista() {

    if (cargado) {
        cargado = false;
        let titulo = document.getElementById("titulo");

        httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = respuestaPeliculas;
        httpRequest.open("GET", "http://www.omdbapi.com/?s=" + titulo.value + "&apikey=350e7505&page=" + pagina);
        httpRequest.send();
    }
}

function respuestaPeliculas() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let datos = JSON.parse(httpRequest.responseText);

            (datos.Search).forEach(pelicula => {
                divPeli = document.createElement("div");
                title = document.createElement("p");
                image = document.createElement("img");

                divPeli.className = "pelicula";
                divPeli.id = pelicula.imdbID;
                title.innerHTML = pelicula.Title;
                title.id = pelicula.imdbID;
                image.src = pelicula.Poster;
                image.id = pelicula.imdbID;

                divPeli.appendChild(image);
                divPeli.appendChild(title);
                document.getElementById("peliculas").appendChild(divPeli);


            });

            pagina++;
            cargado = true;
            aniadirEvents();

        } else {
            alert("There was a problem with the request.");
        }
    }
}

function aniadirEvents() {
    let pelis = document.getElementsByClassName("pelicula");
    for (let i = 0; i < pelis.length; i++) {
        pelicula = pelis[i];
        pelicula.addEventListener("click", detalleEvent);

    }
}


function requestPelicula(id) {
    httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = respuestaPeliInfo;
    httpRequest.open("GET", "http://www.omdbapi.com/?i=" + id + "&apikey=350e7505");
    httpRequest.send();
}

function respuestaPeliInfo() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let pelicula = JSON.parse(httpRequest.responseText);
            console.log(pelicula);

            //Informacion          

            //Botón cerrar info
            cerrarInfo = document.createElement("button");
            cerrarInfo.innerHTML = "X";
            cerrarInfo.id = "close";

            //Div peli_info
            divInfo = document.createElement("div");
            titulo = document.createElement("h2");

            //Div informacion
            info = document.createElement("div");
            year = document.createElement("h4");
            runtime = document.createElement("h4");
            director = document.createElement("h4");
            genre = document.createElement("h4");
            language = document.createElement("h4");
            //Div resumen
            resumen = document.createElement("div");
            actors = document.createElement("h4");
            plot = document.createElement("p");


            //Div informacion
            divInfo.className = "peli_info";
            divInfo.id = pelicula.imdbID;
            titulo.innerHTML = pelicula.Title;
            
            //Div resumen
            info.className = "informacion";
            year.innerHTML = pelicula.Year;
            runtime.innerHTML = pelicula.Runtime;
            director.innerHTML = pelicula.Director;
            genre.innerHTML = pelicula.Genre;
            language.innerHTML = pelicula.Language;
            //Div peli_info
            resumen.className = "resumen";
            actors.innerHTML = pelicula.Actors;
            plot.innerHTML = pelicula.Plot;


            //Div informacion
            info.appendChild(year);
            info.appendChild(runtime);
            info.appendChild(director);
            info.appendChild(genre);
            info.appendChild(language);
            //Div resumen
            resumen.appendChild(actors);
            resumen.appendChild(plot);
            //Div peli_info
            divInfo.appendChild(titulo);
            divInfo.appendChild(info);
            divInfo.appendChild(resumen);
            document.getElementById("info").appendChild(cerrarInfo);
            document.getElementById("info").appendChild(divInfo);

            document.getElementById("close").addEventListener("click", vaciaInfo);
        }
    }


}

function vaciaInfo() {
    document.getElementById("info").innerHTML = "";
}

function detalleEvent(e) {
    requestPelicula(e.target.id);
}