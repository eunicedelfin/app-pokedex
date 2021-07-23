var api = 'https://pokeapi.co/api/v2/';
pokedex = {
    pokemon: {
        id: '',
        name: '',
        height: '',
        weight: '',
        baseStats: {
            hp: '',
            attack: '',
            defense: '',
            specialAtk: '',
            specialDefense: '',
            speed: '',
        },
        sprites: {
            normal: '',
            shiny: '',
            backNormal: '',
            backShiny: '',
            state: 'normal'
        },
        evolutions: [],
        description: [],
        moves:[],
        type: []
    }
};

$(document).ready(function(){
    getPokedexAPI(1, 'pokemon');
    getPokedexAPI(1, 'pokemon-species');

    //RIGHT PANEL - 4TH ROW - prev and next controls
    $(".right-panel-controls").on("click", "button", function () {

        var target = $(this).attr("data-value");
        if (target > 0 && target < 151) {
            getPokedexAPI(target, 'pokemon');
            getPokedexAPI(target, 'pokemon-species');
        }

    });
    
    //RIGHT PANEL - 4TH ROW - input pokemon id
    $(".right-panel-controls").on("keypress", "input", function (e) {

        if (e.key === 'Enter' || e.keyCode === 13) {
            getPokedexAPI($(this).val(), 'pokemon');
            getPokedexAPI($(this).val(), 'pokemon-species');
        }

    });
    console.log("after=>" , pokedex);
});

function getPokedexAPI(id, module) 
{
    switch(module) {
        case 'pokemon':
            $.getJSON(`${api}${module}/${id}`, function (response) {
                updatePokemon(response);
            });
            break;
        case 'pokemon-species':
            $.getJSON(`${api}${module}/${id}`, function (species) {
                storeSpecies(species);
            });
            break;
        case 'evolution-chain':
            $.getJSON(`${api}${module}/${id}/`, function (evolution) {
                pokedex.pokemon.evolutions.push(evolution.chain);
            });
            break;
        case 'move':
            $.getJSON(`${api}${module}/${id}/`, function (moves) {
                storeMoveDetails(moves);
            });
            break;
        case 'version-group':
            $.getJSON(`${api}${module}/${id}/`, function (version) {
                storeVersionGroup(version);
            });
        break;
        default:
            //break
    }
}

/**
 * Displays values from pokedex object
 */
function displayPokemon() 
{

    $(".pokemonName").text(pokedex.pokemon.name);
    $(".pokemonId").text(`No. ` + pokedex.pokemon.id);

    $(".sprite-box").attr("src", pokedex.pokemon.sprites.normal);
    $(".item-description-box").text(pokedex.pokemon.description[0]);

    var weight = pokedex.pokemon.weight ? pokedex.pokemon.weight : 0;
    var height = pokedex.pokemon.height ? pokedex.pokemon.height : 0;
    $(".weight").text("Weight" + weight.toString().padStart(9, '.') + "Lbs");
    $(".height").text("Height" + height.toString().padStart(9, '.') + "'");

    var hp = pokedex.pokemon.baseStats.hp ? pokedex.pokemon.baseStats.hp : 0;
    var attack = pokedex.pokemon.baseStats.attack ? pokedex.pokemon.baseStats.attack : 0;
    var defense = pokedex.pokemon.baseStats.defense ? pokedex.pokemon.baseStats.defense : 0;
    var special_attack = pokedex.pokemon.baseStats.specialAtk ? pokedex.pokemon.baseStats.specialAtk : 0;
    var special_defense = pokedex.pokemon.baseStats.specialDefense ? pokedex.pokemon.baseStats.specialDefense : 0;
    var speed = pokedex.pokemon.baseStats.speed ? pokedex.pokemon.baseStats.speed : 0;
    $(".hp").text("Hp" + hp.toString().padStart(21, '.'));
    $(".attack").text("Attack" + attack.toString().padStart(17, '.'));
    $(".defense").text("Defense" + defense.toString().padStart(16, '.'));
    $(".special_attack").text("Special Attack" + special_attack.toString().padStart(9, '.'));
    $(".special_defense").text("Special Defense" + special_defense.toString().padStart(8, '.'));
    $(".speed").text("Speed" + speed.toString().padStart(18, '.'));
    
    //Loops and displays pokemon type 
    var pokemonType = "";
    $.each(pokedex.pokemon.type, function (key, value) {
        pokemonType += `<div class="stats-box-left-item2 ${pokedex.pokemon.type[key]}">${pokedex.pokemon.type[key]}</div>`;
    });

    $(".stats-box-left-item2").html(pokemonType);


    //Loops evolution chain and displays species evolution
    var spritePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    var noDataSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

    for(var i=1; i<=3; i++){
        $("#stage" + i).text("");
        $("#stage" + i +"-sprite").attr('src', noDataSprite);
    }

    var evolveChain = pokedex.pokemon.evolutions;
    var evolution = evolveChain[0]
    var i = 1;
    do{
        $("#stage" + i).text(evolution.species.name);
        var species_url = evolution.species.url.split("/");
        $("#stage" + i +"-sprite").attr('src', spritePath + species_url[6] + ".png"); 
        evolution = evolution.evolves_to.length > 0 ? evolution.evolves_to[0] : null;
        i++;
    }while(evolution != null);

    //RIGHT PANEL - 3rd Row move details
    $(".ability-name").text(pokedex.pokemon.moves[0].name);

    var accuracy = pokedex.pokemon.moves[0].accuracy ? pokedex.pokemon.moves[0].accuracy : 0;
    var power = pokedex.pokemon.moves[0].power ? pokedex.pokemon.moves[0].power : 0;
    var pp = pokedex.pokemon.moves[0].pp ? pokedex.pokemon.moves[0].pp : 0;
    $(".accuracy").text("Accuracy" + accuracy.toString().padStart(10, '.'));
    $(".power").text("Power" + power.toString().padStart(10, '.'));;
    $(".pp").text("pp" + pp.toString().padStart(10, '.'));

    $("#ability-type").text(pokedex.pokemon.moves[0].type);
    $("#ability-type").addClass(pokedex.pokemon.moves[0].type);

    //RIGHT PANEL - 4th ROW - prev and next pokemon
    $(".prev").attr("data-value", pokedex.pokemon.id - 1);
    $(".next").attr("data-value", pokedex.pokemon.id + 1);

     //RIGHT PANEL - Pokemon ID input
     $(".pokemon-id-input").attr("value", pokedex.pokemon.id);

    var ability_class = pokedex.pokemon.moves[0].ability_class;
    var level_learned_at = pokedex.pokemon.moves[0].level_learned_at;
    var method = pokedex.pokemon.moves[0].method;

    $(".ability_class").text("Class" + ability_class.toString().padStart(15, '.'));
    $(".learned_at").text("Learned At" + level_learned_at.toString().padStart(10, '.'));;
    $(".method").text("Method" + method.toString().padStart(14, '.'));

    $("#short-desc").text(pokedex.pokemon.moves[0].description);
    $("#effect").text(pokedex.pokemon.moves[0].move_effect);
}

/**
 * Stores values from getPokedexAPI 'pokemon' to Pokedex Obj
 * @param {object} pokemon 
 */

function updatePokemon(pokemon)
{
    console.log(pokemon)
    pokedex.pokemon.id = pokemon.id;
    pokedex.pokemon.name = pokemon.name;
    pokedex.pokemon.weight = pokemon.weight;
    pokedex.pokemon.height = pokemon.height;

    pokedex.pokemon.baseStats.hp = pokemon.stats[0].base_stat;
    pokedex.pokemon.baseStats.attack = pokemon.stats[1].base_stat;
    pokedex.pokemon.baseStats.defense = pokemon.stats[2].base_stat;
    pokedex.pokemon.baseStats.specialAtk = pokemon.stats[3].base_stat;
    pokedex.pokemon.baseStats.specialDefense = pokemon.stats[4].base_stat;
    pokedex.pokemon.baseStats.speed = pokemon.stats[5].base_stat;

    pokedex.pokemon.sprites.normal = pokemon.sprites.front_default;
    pokedex.pokemon.sprites.shiny = pokemon.sprites.front_shiny;
    pokedex.pokemon.sprites.backNormal = pokemon.sprites.back_default;
    pokedex.pokemon.sprites.backShiny = pokemon.sprites.back_shiny;

    //Loops pokemon type and stores in Pokemon object
    $.each(pokemon.types, function(key, value) {
        pokedex.pokemon.type.push(pokemon.types[key].type.name);
    });

    //Loops pokemon moves and stores in Pokemon object
    $.each(pokemon.moves, function(key, value) {
        if(pokemon.moves[key].version_group_details[0].level_learned_at == 0 && pokemon.moves[key].version_group_details[0].version_group.name == 'red-blue'){

            var move_id = pokemon.moves[key].move.url.split("/");
            pokedex.pokemon.moves.push({
                id: move_id[6],
                name: pokemon.moves[key].move.name,
                level_learned_at: pokemon.moves[key].version_group_details[0].level_learned_at
            });
        }
    });

    var move_id = parseInt(pokedex.pokemon.moves[0].id);
    
    getPokedexAPI(move_id, 'move');
    getPokedexAPI(pokedex.pokemon.evolution_chain_id, 'evolution-chain');
}

/**
 * Stores response from module getPokedexAPI 'pokemon-species' to pokemon obj
 * @param {object} species 
 */
function storeSpecies(species)
{
    console.log(species);
    var evolution_chain_id = species.evolution_chain.url.split("/");
    pokedex.pokemon.evolution_chain_id = parseInt(evolution_chain_id[6]);
    console.log("evolution chain =>", pokedex.pokemon.evolution_chain_id);

    //Loops pokemon API flavor_text_entries and stores in Pokemon description array
    $.each(species.flavor_text_entries, function(key, value){
        if(species.flavor_text_entries[key].language.name == 'en' && species.flavor_text_entries[key].version.name == 'red' || 
        species.flavor_text_entries[key].language.name == 'en' && (species.flavor_text_entries[key].version.name == 'yellow' || 
        species.flavor_text_entries[key].language.name == 'en' && (species.flavor_text_entries[key].version.name == 'gold')))
            {
                pokedex.pokemon.description.push(species.flavor_text_entries[key].flavor_text);
            }
    });
    
}

/**
 * Stores response from module getPokedexAPI 'moves' to pokemon obj
 * @param {object} move 
 */
function storeMoveDetails(move)
{

    $.each(pokedex.pokemon.moves, function(key, value) {
        if(move.id == pokedex.pokemon.moves[key].id){
            pokedex.pokemon.moves[key]['accuracy'] = move.accuracy;
            pokedex.pokemon.moves[key]['power'] = move.power;
            pokedex.pokemon.moves[key]['pp'] = move.pp;
            pokedex.pokemon.moves[key]['type'] = move.type.name;
            pokedex.pokemon.moves[key]['description'] = move.flavor_text_entries[0].flavor_text;
            pokedex.pokemon.moves[key]['move_effect'] = move.effect_entries[0].effect;
            pokedex.pokemon.moves[key]['ability_class'] = move.damage_class.name;
            pokedex.pokemon.moves[key]['version_group'] = move.flavor_text_entries[0].version_group.url;
        }    
    });  

    var version_group = pokedex.pokemon.moves[0].version_group.split("/");
    getPokedexAPI(version_group[6], version_group[5]);

}

/**
 * Stores response from module getPokedexAPI 'version-group' to pokemon obj
 * @param {object} version 
 */
function storeVersionGroup(version)
{

    var version_group_id = pokedex.pokemon.moves[0].version_group.split("/");
    
    $.each(pokedex.pokemon.moves, function(key, value) {
        if(version.id == version_group_id[6]){
            pokedex.pokemon.moves[key]['method'] = version.move_learn_methods[0].name;
        }    
    }); 

    displayPokemon();
}
