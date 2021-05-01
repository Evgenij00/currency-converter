import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

type CurrencyRatesViewProps = {
  currenciesNames: any
  items: any
  baseCurrency: string
  hendleChangeSelector: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const CurrencyRatesView: React.FC<CurrencyRatesViewProps> = ({ currenciesNames, items, baseCurrency, hendleChangeSelector }) => {
  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Выберите валюту</Form.Label>
          <Form.Control as="select"
            value={baseCurrency}
            onChange={hendleChangeSelector}
            custom>
            {currenciesNames}
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
          {items}
        </tbody>
      </Table>
    </>
  );
}