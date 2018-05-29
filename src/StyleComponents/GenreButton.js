import styled, {css} from 'styled-components';

const GenreButton = styled.button`

  display: inline-block;
  float: left;
  border-radius: 8px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  height: 60px
  background: 929191;
  color: blue;
  border: 4px solid lime;
  :hover {
    background-color: lime;
    }
`;

export default GenreButton;