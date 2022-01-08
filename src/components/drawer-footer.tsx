import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import basket from '../store/basket'
import { observer } from 'mobx-react-lite';

const DrawerFooter = () => {
    const { Title } = Typography;
    const navigate = useNavigate()
    const location = useLocation()
    const [totalPrice, setTotalPrice] = React.useState(0)

    const handleClick = () => {
        if(location.pathname === '/basket') navigate('/payment')
        if(location.pathname === '/payment') console.log('hello')
    }

    React.useEffect(() => {
        setTotalPrice(basket.list.reduce((sum, elem) => {
            return +(sum + elem.price).toFixed(2)
        }, 0))
    }, [basket.list])

    React.useEffect(() => {
        if(location.pathname === '/payment' && !totalPrice){
            navigate('/')
        }
    },[location.pathname, totalPrice])

    return (
        <DrawerFooterWrap>
            <Row justify='space-between'>
                <Col>
                    <Title level={3}>
                    Total price: 
                    </Title>
                </Col>
                <Col>
                    <Title level={3}>
                    {totalPrice}$
                    </Title>
                </Col>
            </Row>
            <Button type='primary' onClick={handleClick} block size='large'>
                {location.pathname === '/basket' ? 'Go to payment' : 'To order'}
            </Button>
        </DrawerFooterWrap>
    )
}

export default observer(DrawerFooter)

const DrawerFooterWrap = styled.div`
    user-select: none;
`