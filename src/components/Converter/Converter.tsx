import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Converter extends Component {
  render() {
    return (
      <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Что вы хотите конвертировать?</Form.Label>
        <Form.Control
          type="text"
          value='100 usd in rub'
          placeholder="10 usd in rub"
        />
        <Form.Text className="text-muted">
          Убедитесь, что вы правильно ввели данные. Регистр не имеет значения.
          Пример: 10 usd in rub
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Конвертировать
      </Button>
    </Form>
    );
  }
}
