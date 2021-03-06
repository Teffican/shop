import { Badge, Button, Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Container from './container'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import basket from '../store/basket';
import product from '../store/product';
import { observer } from 'mobx-react-lite';

const HeaderWrap = () => {
    const handleClick = () => {
        basket.setIsVisible(true)
    }

    const fakeReload = () => {
        product.searchProducts('')
        product.setActivePage(1)
        product.filterProducts('all', 'none')
        window.scrollTo(0,0)
    }

    return (
        <Header style={HeaderStyles}>
            <Container>
                <Row justify="space-between">
                    <Col>
                        <Link to="/" onClick={fakeReload}>
                            <Logo>Shop</Logo>
                        </Link>
                    </Col>
                    <Col>
                        <Badge count={basket.list.length} overflowCount={99} offset={[0,35]}>
                            <Button block size="large" icon={<ShoppingCartOutlined />} onClick={handleClick}>
                                Basket
                            </Button>
                        </Badge>
                    </Col>
                </Row>
            </Container>
        </Header>
    )
}

export default observer(HeaderWrap)

const Logo = styled.div`
    color: #eee;
    font-size: 35px;
    font-weight: 700;
    user-select: none;
`;

const HeaderStyles: React.CSSProperties = {
    padding: 0,
    position: 'fixed',
    width: '100vw',
    zIndex: 999,
}





