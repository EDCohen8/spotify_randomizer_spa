export var genres = [];
export var url = '';
export var artist = ''

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