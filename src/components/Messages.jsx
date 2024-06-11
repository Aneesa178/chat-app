import React from 'react'
import styled from 'styled-components'

export default function Messages() {
    return (
        <Container>Messages</Container>
    )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;