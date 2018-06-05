import React from 'react';
import ReactDOM from 'react-dom';
import {addArtist,addArt,art, addPop,pop,artist,resetGenres,addGenre,removeGenre, genres} from '../globals';

describe('Global Tests', () => {
    it('should be able to add artist', ()=>{
        addArtist('Tommy')
        expect(artist).toBe('Tommy')
    });
    it('Should be able to add genre',()=>{
        addGenre('rap')
        expect(genres).toEqual(['rap'])
    });
    it('Reset genre and remove Specified genre',()=>{
        resetGenres()
        addGenre('rap')
        addGenre('pop')
        removeGenre('pop')
        expect(genres).toEqual(['rap'])
    });
    it('Add pop', ()=>{
        addPop("12")
        expect(pop).toEqual([1,2])
    })
    it('Adds art', ()=>{
        addArt('test.jpg')
        expect(art).toBe('test.jpg')
    })
});