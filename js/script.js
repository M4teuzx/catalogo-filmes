let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let mostrarFilme = document.getElementById("mostrar-filme");
let btnFechar = document.getElementById("btnfecha");
let imgCartaz= document.createElement("img");
let card = document.querySelector("#lista-filmes");

btnFechar.onclick = () => {
    mostrarFilme.style.display = "none";
    btnFechar.style.display = "none";
    card.style.display="flex";
}

btnBuscarFilme.onclick = async () => {
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?apikey=ba316868&s="+inputBuscarFilme.value)
        .then((resp) => resp.json())
        .then((resp)=> {
        console.log(resp);
        resp.Search.forEach((item)=>{
            console.log(item);
            let filme=new Filme(
                item.imdbID,
                item.Title,
                item.Year,
                null,
                null,
                item.Poster,
                null,
                null,
                null,
                null,
                null,
                );
                filmes.push(filme);
            });
            listarFilmes(filmes);
        })

    }
    return false;
}

let detalhesFilme = async (id) => {
    fetch("http://www.omdbapi.com/?apikey=ba316868&i="+id)
    .then ((resp) => resp.json())
    .then ((resp)=> {
        card.style.display="none";
        console.log(resp);
        mostrarFilme.innerHTML = `titulo: ${resp.Title}ano: ${resp.Year}\ngenero:  ${resp.Genre}\ndiretor:  ${resp.Director}\natores:  ${resp.Actors}\nplot:  ${resp.Plot}\nrated: ${resp.Rated}\nimdb:  ${resp.imdbRating}`;
        imgCartaz.setAttribute("class", "poster-detalhes");
        imgCartaz.setAttribute("src",resp.Poster);
        mostrarFilme.appendChild(imgCartaz);


    });
}  

let listarFilmes = async(filmes) => {
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    if(filmes.length > 0) {
        filmes.forEach(async(filme) => {
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                mostrarFilme.style.display= "block";
                btnFechar.style.display= "block";
                detalhesFilme(filme.id);
                console.log(filme.id)
            }
        });
    }
}


