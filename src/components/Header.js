import React from 'react';
import { Container, Row, Col, NavbarBrand, Navbar } from 'reactstrap';

const Header = () => {
    return <Container>
        <Row>
            <Col className="">
                <Navbar
                    color="white"
                    expand="md"
                    light
                >
                    <NavbarBrand href="/">
                        Tobi's Translator App
                    </NavbarBrand>
                </Navbar>
            </Col>
        </Row>
    </Container>
};

export default Header;
