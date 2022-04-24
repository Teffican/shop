import { Button, Card, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import basket from '../../store/basket'
import { ProductType } from '../../types/product'

const ProductsItem = ({id, image, title, price, description, count, category}:ProductType) => {
    const { Title } = Typography;
    const [isProductAdded, setIsProductAdded] = React.useState(false)

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if(!isProductAdded) basket.addToBasket({id, image, title, price, description, count, category})
        if(isProductAdded) basket.removeFromBasket(id)
    }

    React.useEffect(() => {
        setIsProductAdded((basket.list.findIndex(item => item.id === id)) > -1 ? true : false)
    }, [basket.list.length])

    return (
        <Link to={`/product?id=${id}`} key={id}>
            <Card bodyStyle={CardBodyStyles} hoverable>
                <Img src={image} loading='lazy'/>
                <Title level={3} style={TitleStyles} >
                    {title.slice(0,25)}{title.length > 25 && '...'}
                </Title>
                <CardBottom>
                    <Price>
                        {price}$
                    </Price>
                    <Button onClick={handleClick} type={'primary'} danger={isProductAdded}>
                        {isProductAdded ? 'Remove' : 'Add to basket'}
                    </Button>
                </CardBottom>
            </Card>
        </Link>
    )
}

export default observer(ProductsItem)

const Img = styled.img`
    object-fit: cover;
    height: 200px;
    width: 100%;
`

const CardBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`

const Price = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 500;
`

const CardBodyStyles: React.CSSProperties = {
    height: '400px',
    backgroundColor: '#d6e4ff'
} 

const TitleStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    maxHeight: '100px',
    height: '100%'
}