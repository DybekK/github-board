import React from "react";
import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  height: "auto",
  width: "100vw",
  justifyContent: "center"
});

type FlexContainerProps = {
  children: React.ReactNode;
};

export function FlexContainer({ children }: FlexContainerProps) {
  return <Container>{children}</Container>;
}
