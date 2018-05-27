import styled, {css} from 'styled-components';

const GenreButton = styled.button`

  display: inline-block;
  float: left;
  border-radius: 12px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  height: 80px
  background: 929191;
  color: blue;
  border: 2px solid white;
  :hover {
    background-color: yellow;
    }
`;

export default GenreButton;