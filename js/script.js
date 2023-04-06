let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let mostrarFilme = document.getElementById("mostrar-filme");
let btnFechar = document.getElementById("btnfecha");
let imgCartaz= document.createElement("img");
let card = document.querySelector("#lista-filmes");
let detMostrar = document.querySelector("#detMostrar-filme");
let btnfavoritar = document.querySelector("#btnfavoritar");
let btnFavoritosFilme = document.querySelector("#favoritos");
let btnexcluir = document.querySelector("#btnexcluir");
let btneditar = document.querySelector("#btneditar");
let filmeAtual = null;

btnFechar.onclick = () => {
    mostrarFilme.style.display = "none";
    btnFechar.style.display = "none";
    btnfavoritar.style.display = "none";
    btnexcluir.style.display = "none";
    btneditar.style.display = "none";
    card.style.display = "flex";
};


btnBuscarFilme.onclick = async () => {
    if (inputBuscarFilme.value.length > 0) {
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?apikey=ba316868&s=" + inputBuscarFilme.value)
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp);
                resp.Search.forEach((item) => {
                    console.log(item);
                    let filme = new Filme(
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
            });
    }
    return false;
};

btnFavoritosFilme.onclick = async () => {
    listarFavoritos();
};

let detalhesFilme = async (id) => {
    fetch("http://www.omdbapi.com/?apikey=ba316868&i=" + id)
        .then((resp) => resp.json())
        .then((resp) => {
            card.style.display = "none";
            console.log(resp);
            detMostrar.innerHTML = `titulo: ${resp.Title} ano: ${resp.Year} genero:  ${resp.Genre} diretor:  ${resp.Director} atores:  ${resp.Actors} plot:  ${resp.Plot} rated: ${resp.Rated} imdb:  ${resp.imdbRating}`;
            imgCartaz.setAttribute("class", "poster-detalhes");
            imgCartaz.setAttribute("src", resp.Poster);
            mostrarFilme.appendChild(imgCartaz);
            filmeAtual = resp;
        });
};  

function listarFavoritos(){
    let favouritesMovies = localStorage.getItem('favoritesMovies');
    favouritesMovies=JSON.parse(favouritesMovies);
    let filmes = new Array();
    favouritesMovies.forEach((item) =>{
        let filme = new Filme(
            item.id,
            item.titulo,
            item.ano,
            item.genero,
            item.duracao,
            item.cartaz,
            item.direcao,
            item.elenco,
            item.classificacao,
            item.avaliacao
        );
        filmes.push(filme);
    });
    listarFilmes(filmes);
}

let salvarFilmeAtual = () => {
    if (filmeAtual) {
      let filmesString = localStorage.getItem("filmesFavoritos");
      let filmes = null;
      if (filmesString) {
        filmes = JSON.parse(filmesString);
        filmes.push(filmeAtual);
      } else {
        filmes = [filmeAtual];
      }
      localStorage.setItem("filmesFavoritos", JSON.stringify(filmes));
      alert("Filme adicionado aos favoritos!");
    }
  }
  
  let listarFilmes = async(filmes) => {
    let listaFilmes = document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    if (filmes.length > 0) {
      filmes.forEach(async(filme) => {
        let card = await filme.getCard();
        listaFilmes.appendChild(card);
        let btnDetalhes = filme.getBtnDetalhes();
        btnDetalhes.onclick = () => {
          mostrarFilme.style.display = "block";
          btnFechar.style.display = "block";
          btnfavoritar.style.display = "block";
          btnexcluir.style.display = "block";
          btneditar.style.display = "block";
          detalhesFilme(filme.id);
          filmeAtual = filme;
        }
        let btnFavoritar = card.querySelector("#btnfavoritar");
        btnFavoritar.onclick = () => {
          salvarFilmeAtual();
        }
      });
    } else {
      listaFilmes.innerHTML = "Nenhum filme encontrado :(";
    }
  }
     

  let salvarFilme = (filme) => {
    let filmesString = localStorage.getItem("filmesFavoritos");
    let filmes = null;
    if(filmesString){
      filmes = JSON.parse(filmesString);
      filmes.push(filme);
    } else {
      filmes = [filme];
    }
    localStorage.setItem("filmesFavoritos", JSON.stringify(filmes));
    alert("Filme adicionado aos favoritos!");
  }
  
 let apagarfilme = (filme) => {
    let filmesString = localStorage.getItem("filmesFavoritos");
    let filmes = null;
    if(filmesString){
      filmes = JSON.parse(filmesString);
      filmes.splice(filme);
    } else {
      filmes = [filme];
    }
    localStorage.setItem("filmesFavoritos", JSON.stringify(filmes));
    alert("Filme removido dos favoritos!");
  }
  
  btnexcluir.onclick = () => {
    apagarfilme(filmeAtual);
  }

  btnfavoritar.onclick = () => {
    salvarFilme(filmeAtual);
  }

 

  