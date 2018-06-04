import React from 'react';
import { shallow } from 'enzyme';
import GenreSelection from '../../../spotify_spa/src/GenreSelection';
import Cookies from 'universal-cookie';

const testCookies = new Cookies();

describe('GenreSelection', () => {
    describe("testing that the api key is received", () => {
        it('should connect successfully to the api', () => {
            const wrapper = shallow(<GenreSelection />);
            expect(wrapper.cookies.get("access_token")).to.equals(testCookies.get("access_token"))
        })
    });
    describe("testing that the api data can be retrieved", () => {
        it('should have a length of an array length 126 (total spotify genres)', () => {
            const wrapper = shallow(<GenreSelection />);
            expect (wrapper.state('spotifyGenres').length.to.equals(126))
        });
    })





});