import React from "react";
import { Col, Grid, Row } from "rsuite";
import Sidebar from "../../components/Sidebar";
import Chat from "./Chat";

function GridLayout() {
  return (
    <Grid fluid className="h-100">
      <Row className="h-100">
        <Col xs={24} md={8} className="h-100">
          <Sidebar />
        </Col>
        <Chat />
      </Row>
    </Grid>
  );
}

export default GridLayout;
