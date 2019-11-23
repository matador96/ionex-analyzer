import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Menu = props => (
  <div id="menu-electron">
    <DropdownButton variant="dark" d="dropdown-basic-button" title="Меню">
      <Dropdown.Item href="#/action-1">Как пользоваться</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Сделать скриншот</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Сбросить результаты</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4">GitHub</Dropdown.Item>
    </DropdownButton>
  </div>
);

export default Menu;
