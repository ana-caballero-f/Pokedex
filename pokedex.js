//Crear variables de URL y selector donde se pintarán los personajes

const myOl$$ = document.querySelector('#pokedex');

//1 LLAMAR A LA API
//========================================================

const conseguirPokemons = async() => {
    const arrayPkm = [];
    for(let i=1; i<=151; i++){
        const respuestaApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const respuesta = await respuestaApi.json();
        arrayPkm.push(respuesta);
    }
    return arrayPkm;    
}
// conseguirPokemons();



 //3 VARIABLE CON .MAP PARA SACAR DE CADA PERSONAJE
 //LAS PROPIEDADES QUE SE QUIERAN (nombre, imagen...)
 //==================================================================

 const mapPokemons = (pokemons) => {
    // console.log(pokemons)
    return pokemons.map((pokemon)=> ({
        nombre: pokemon.name,
        imagen: pokemon.sprites['front_default'],
        type: pokemon.types.map((type) => type.type.name).join(', '),
	    id: pokemon.id    
    }));  
 }


// 4 PINTAR LOS PERSONAJES (METERLOS EN EL DOM)
//========================================================
//función que va en el init() y que pintará los pokemons
const pintarPokemons = (pokemons) => {
    // console.log(pokemons);
    myOl$$.innerHTML="";

for(const pokemon of pokemons) {
    let pkmDiv =document.createElement('div');
    pkmDiv.className = "main_div";

    let pkmCard = document.createElement('figure');
    pkmCard.className = "card";

    let pkmTitle = document.createElement('h4');
    pkmTitle.className = "card-title";
    pkmTitle.textContent = pokemon.nombre;

    let pkmImage = document.createElement('img');
    pkmImage.className = "card-image"
    pkmImage.setAttribute("src", pokemon.imagen);
    pkmImage.setAttribute("alt", pokemon.nombre);

    let pkmId = document.createElement('h4');
    pkmId.className = "pkm-id";
    pkmId.textContent = pokemon.id;


    let pkmTipo = document.createElement('div');
    pkmTipo.className = "card-subtitle";
    pkmTipo.textContent = pokemon.type;

    let pkmBtnSi = document.createElement('button');
    pkmBtnSi.className = " btn btn-si";
    pkmBtnSi.textContent = "Si-le"

    let pkmBtnNo = document.createElement('button');
    pkmBtnNo.type= "radio";
    pkmBtnNo.className = "btn btn-no";
    pkmBtnNo.textContent = "No-le";

    let texto = document.createElement('p');
    texto.textContent = "¿Lo quieres?"
    texto.className = "textoLoQuiero";
   

//FUNCIÓN con los BOTONES SI-LE y NO-LE de las cartas (CREADOS CON JS)
//Va dentro del bucle que crea los elementos.
//===============================================================================

const lista = [];

//poner botón de Si-le en verde
pkmBtnSi.addEventListener("click", fncSiTengo);


function fncSiTengo(e) {
    pkmBtnSi.classList.toggle('sile');

    if(e.target.classList.contains('sile')){
        pokemon.loTengo= "Lo tengo!";
        lista.push(pokemon.nombre, pokemon.loTengo);
    }
        console.log(lista);  
}


//poner botón de No-le en rojo
pkmBtnNo.addEventListener("click", fncNoTengo);

function fncNoTengo(e) {
    pkmBtnNo.classList.toggle('nole');
    if(e.target.classList.contains('nole')){
         pokemon.loTengo= "No lo tengo...";                          
         lista.push(pokemon.nombre, pokemon.loTengo);              
    }
    console.log(lista);
}


//lo quiero! (estrella)

texto.addEventListener("click", fnccambiarEstrella);

function fnccambiarEstrella() {
    texto.textContent = "¡Me lo pido!";
    texto.classList.toggle('amarillo')
}


//////////// meter en el DOM los elementos creados dinámicamente: 
pkmCard.appendChild(pkmDiv);
pkmCard.appendChild(pkmTitle);
pkmCard.appendChild(pkmImage);
pkmCard.appendChild(pkmId);
pkmCard.appendChild(pkmTipo);
pkmCard.appendChild(pkmBtnSi);
pkmCard.appendChild(pkmBtnNo);
pkmCard.appendChild(texto);

myOl$$.appendChild(pkmCard);
    }
};


//mostrar listado de los botones recogidos en las cartas (si, no y lo quiero)
//=============================================================================

const listado = document.querySelector('.listado');
listado.addEventListener("click", fncMostrarListado);

function fncMostrarListado() {
    console.log("click");
    // console.log(lista);
}


//5 CREAR BUSCADOR POR LETRA INICIAL .nombre[0]
//===================================================
const dibujarInput = (pokemons) => {
    const input$$ = document.querySelector('#letraInicio');
    input$$.addEventListener("input", ()=> 
        fncBuscarPokemon(input$$.value, pokemons));
};

fncBuscarPokemon = (filtro, array) => {
    let pokemonsFiltrados = array.filter((pokemon) => 
    pokemon.nombre[0].toLowerCase().includes(filtro.toLowerCase())
    );
    pintarPokemons(pokemonsFiltrados);
};



//6 CREAR BUSCADOR POR TIPO
//===================================================== 

const dibujarInput2 = (pokemons) => {
    const input2$$ = document.querySelector('#tipo1');
    input2$$.addEventListener("input", ()=> 
        fncBuscarTipo(input2$$.value, pokemons));
};

fncBuscarTipo = (filtro1, array) => {
    let pokemonsTipos = array.filter((pokemon) => 
    pokemon.type.includes(filtro1)
    );
    pintarPokemons(pokemonsTipos);
};


//7 CREAR BUSCADOR POR NOMBRES (QUE INCLUYA CADENA)
//=======================================================
const dibujarInput3 = (pokemons) => {
    const input3$$ = document.querySelector('#letras');
    input3$$.addEventListener("input", ()=> 
        fncBuscarCadena(input3$$.value, pokemons));
};

fncBuscarCadena = (filtro, array) => {
    let pokemonsNombre = array.filter((pokemon) => 
    pokemon.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
    pintarPokemons(pokemonsNombre);
};


// //8 SI-LE Y NO-LE FUNCIÓN
// //===============================================

// // // CON LOS BOTONES CRADOS EN EL HTML:
// const botonesRV = document.querySelectorAll('.rv');
// for(let boton of botonesRV){
//     boton.addEventListener("click", fncSiTengo)
// }

// function fncSiTengo(e) {
//     e.target.classList.toggle('sile'); 
// }



//2 INIT() 
//CREAR LA FUNCIÓN
//CON TODO EL PROCESO
//======================================================================

const init = async() => {
    const pokemons = await conseguirPokemons();
        //console.log(pokemons)
    const pokemonsMapeados = mapPokemons(pokemons); 
        //console.log(pokemonsMapeados);
    pintarPokemons(pokemonsMapeados);
    dibujarInput(pokemonsMapeados);
    dibujarInput2(pokemonsMapeados);
    dibujarInput3(pokemonsMapeados);
    fncMostrarListado(listado);
 };

init();