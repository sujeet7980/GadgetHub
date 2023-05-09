import React from 'react'
import { Container,Row, Col} from 'react-bootstrap'

const Footer = () => {
  return (
    <>
    <Container>
        <Row>
            <Col className='text-center'>
            <span >&copy; copyright by me</span>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Footer