import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  /* padding: 10px 10px 10px 10px; */
  min-height: 100svh;

  /* Escala el ancho máximo para pantallas más grandes */
  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 768px;
  }
`

export const TitleHeader = styled.h1`
  color: #fff;
`

export const BetweenContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
