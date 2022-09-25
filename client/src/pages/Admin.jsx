import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Admin() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{height:"80vh"}} >
      <Row className="">
        <Col>
          <h1 className="text-danger notadmin">Restricted</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;