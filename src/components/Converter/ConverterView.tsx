import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { TString } from "../../actions/types";

type ConverterProps = {
  string: string
  result: string
  setString: (value: string) => TString
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const ConverterView: React.FC<ConverterProps> = ({ string, result, setString, handleFormSubmit}) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Что вы хотите конвертировать?</Form.Label>
        <Form.Control
          type="text"
          value={string}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setString(e.target.value)}
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
      {result}
    </Form>
  );
};