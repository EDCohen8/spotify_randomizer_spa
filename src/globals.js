//globla variables that can be access from all components.
//This is sufficient, because this does not mess with security (access_token is only good for an hour, and does not give access to any private information)
export var genres = [];
export var url = '';
export var artist = '';
export var art = [];
export var pop = [];
export var artists = [];
export var name = "Please Login and generate a song";
export var popularity = 0;

export function setPopularity(a){
    popularity = a;
}

export function setName(a){
    name = "Related Artists to " + a;
}

export function addArtists(a){
    artists = a;
}

export function addGenre(newValue) {

    genres.push(newValue)
}

export function removeGenre(value){
    var index = genres.indexOf(value);
    if (index > -1) {
        genres.splice(index, 1);
    }
}

export function addTrack(newValue){
    url = newValue
}

export function addArtist(a){
    artist = a
}

export function addArt(a){
    art = a;
}

export function addPop(a){
    var temp = [];
    for(var i = 0; i < a.length; i++){
        temp.push(parseInt(a[i]))
    }
    pop = temp;
}

export function resetGenres(){
    genres = [];
}