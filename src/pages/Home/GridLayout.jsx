import React from "react";
import { Col, Grid, Row } from "rsuite";
import Sidebar from "../../components/Sidebar";
import Chat from "./Chat";
import { useMediaQuery } from "../../misc/custom-hooks";
import { useMatch } from "react-router-dom";

function GridLayout() {
  const isDesktop = useMediaQuery("(min-width: 992px)");

  const route = useMatch("/");

  const canRenderSidebar = isDesktop || route;

  return (
    <Grid fluid className="h-100">
      <Row className="h-100">
        {canRenderSidebar && (
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        )}

        <Col xs={24} md={16} className="h-100">
          <Chat />
        </Col>
      </Row>
    </Grid>
  );
}

export default GridLayout;
