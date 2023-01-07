import styled from "styled-components";

export const HeaderText = styled.h3`
    font-size:3rem ;
    &:hover{
        color: orange;
    }
`
export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    @media ${(props) => props.theme.breakpoints.xl} {
    }
    @media ${(props) => props.theme.breakpoints.lg} {
        grid-template-columns: repeat(3, 1fr);
    }
    @media ${(props) => props.theme.breakpoints.md} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${(props) => props.theme.breakpoints.sm} {
        grid-template-columns: repeat(1, 1fr);
    }
`
export const ProductContainer = styled.div`
    margin: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    @media ${(props) => props.theme.breakpoints.xl} {
    }
    @media ${(props) => props.theme.breakpoints.lg} {
        grid-template-columns: repeat(3, 1fr);
    }
    @media ${(props) => props.theme.breakpoints.md} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${(props) => props.theme.breakpoints.sm} {
        grid-template-columns: repeat(1, 1fr);
    }
`
export const PlaceOrderContainer = styled.div`
 
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    @media ${(props) => props.theme.breakpoints.xl} {
    }
    @media ${(props) => props.theme.breakpoints.lg} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${(props) => props.theme.breakpoints.md} {
        width: 100%;
        margin: 0;
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${(props) => props.theme.breakpoints.sm} {
        margin-top: 300px;
        grid-template-columns: repeat(1, 1fr);
    }
`

