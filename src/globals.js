export var genres = [];
export var url = '';
export var artist = '';
export var art = [];
export var pop = [];

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