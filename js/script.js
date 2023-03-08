let ator = new Ator(1, "JOHN WAYNE");
console.log(ator)

let direcao = [
    new Diretor(1, "lana wachowski"),
    new Diretor(2, "Lilly wachowski")
];

let elenco = [
    new Ator(1, "keanu reeves"),
    new Ator(2, "Carrie-anne moss"),
    new Ator(3, "laurence fishburne"),
    new Ator(4, "joe pantoliano"),
    new Ator(5, "hugo weaving"),
    new Ator(6, "Antony ray parker"),
]

let genero = "terror"

let sinopse = "um jovem programador (keanu reeves) é atormentado por estranhos pesadelos nos quais sempre está com... "

let cartaz = "https://m.media-amazon.com/images/I/81LVfPpDHRS.jpg"

let filme = new Filme(
    1,
    "matrix",
    1999,
    genero,
    102,
    sinopse,
    cartaz,
    direcao,
    elenco,
    14,
    null
    );

    console.log(filme)