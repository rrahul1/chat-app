import React from "react";
import { Col, Grid, Row } from "rsuite";
import Sidebar from "../../components/Sidebar";
import { RoomsProvider } from "../../context/rooms.context";
import Chat from "./Chat";

function GridLayout() {
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
          <col>
            <Chat />
          </col>
        </Row>
      </Grid>
    </RoomsProvider>
  );
}

export default GridLayout;
