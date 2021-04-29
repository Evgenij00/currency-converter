import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export default class CurrencyRatesTable extends Component {
  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Custom select</Form.Label>
            <Form.Control as="select" custom>
              <option value="USD">USD</option>
              <option value="EUR">USD</option>
              <option value="RUB">USD</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Основные пары</th>
              <th>Покупка</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD/RUB</td>
              <td>10</td>
            </tr>
            <tr>
              <td>USD/RUB</td>
              <td>10</td>
            </tr>
            <tr>
              <td>USD/RUB</td>
              <td>10</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
