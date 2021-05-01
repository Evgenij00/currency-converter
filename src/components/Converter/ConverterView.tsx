import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import './Converter.css'

type ConverterProps = {
  string: string
  general: string
  inputValid: boolean
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ConverterView: React.FC<ConverterProps> = ({ string, general, inputValid, handleFormSubmit, handleInputChange}) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Что вы хотите конвертировать?</Form.Label>
        <Form.Control
          type="text"
          value={string}
          onChange={handleInputChange}
          placeholder="10 usd in rub"
        />
        <Form.Text className="text-muted">
          Убедитесь, что вы правильно ввели данные (должны быть в формате ISO). Регистр не имеет значения.
          Пример: 10 usd in rub
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" className="btn" disabled={!inputValid}>
        Конвертировать
      </Button>
      {general}
    </Form>
  );
};