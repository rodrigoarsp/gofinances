import React from 'react';

import { Container,
    Hader,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from './styled';

interface Props {
    type: "up" | "down" | "total";
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function HighligthCard({
    type,
    title, 
    amount, 
    lastTransaction
} : Props){

    return(
        <Container type={type}>
            <Hader>
                <Title type={type}>
                    {title}
                </Title>
                <Icon 
                    name={icon[type]} 
                    type={type}
                /> 
            </Hader>

            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTransaction type={type}>
                    {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    )
}