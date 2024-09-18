import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import PaymentButtons from './options';


class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '$',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00'
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        price: '1.00',
        quantity: 1
      }
    ];
    this.editField = this.editField.bind(this);
  }

  componentDidMount(prevProps) {
    this.handleCalculateTotal();
  }

  handleRowDel(index) {
    const updatedItems = [...this.state.items];
    updatedItems.splice(index, 1);
    this.setState({ items: updatedItems }, () => {
      this.handleCalculateTotal();
    });
  }

  handleAddEvent(evt) {
    evt.preventDefault();
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: '',
      price: '1.00',
      quantity: 1
    };

    const updatedItems = [...this.state.items, newItem];

    this.setState({ items: updatedItems }, () => {
      this.handleCalculateTotal();
    });
  }

  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat((item.price * item.quantity).toFixed(2));
    });

    this.setState({ subTotal: subTotal.toFixed(2) }, () => {
      const taxAmount = parseFloat((subTotal * (this.state.taxRate / 100)).toFixed(2));
      const discountAmount = parseFloat((subTotal * (this.state.discountRate / 100)).toFixed(2));
      const total = parseFloat(subTotal - discountAmount + taxAmount).toFixed(2);

      this.setState({
        taxAmmount: taxAmount,
        discountAmmount: discountAmount,
        total: total
      });
    });
  }

  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    var newItems = items.map(function (items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({ items: newItems });
    this.handleCalculateTotal();
  };

  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };

  onCurrencyChange = (event) => {
        this.setState({ currency: event.target.value });
  };

  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };

  closeModal = (event) => this.setState({ isOpen: false });

  render() {
    const buttonStyle = {
      backgroundColor: '#007bff', 
      color: 'white',
      border: 'none'
    };

    return (
      <Form onSubmit={this.openModal}>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                      <span className="current-date">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                </div>
                <div className="d-flex flex-row align-items-center ">
                  <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                  <Form.Control type="number" value={this.state.invoiceNumber} name={"invoiceNumber"} onChange={(event) => this.editField(event)} min="1" style={{ maxWidth: '90px' }} required="required" className="invoice-input" />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-5">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required" />
                  <Form.Control placeholder={"Number"} value={this.state.billToNumber} type="number" name="billToNumber" className="my-2" onChange={(event) => this.editField(event)} autoComplete="number" required="required" />
                  <Form.Control placeholder={"Billing address"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required" />
                </Col>
              </Row>
              <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} />

              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Currency:</Form.Label>
                    <Form.Select onChange={this.onCurrencyChange} className="btn btn-light my-1" aria-label="Change Currency">
                      <option value="$">USD (United States Dollar)</option>
                      <option value="£">GBP (British Pound Sterling)</option>
                      <option value="₹">INR (Indian Rupee)</option>
                      <option value="¥">JPY (Japanese Yen)</option>
                      <option value="$">CAD (Canadian Dollar)</option>
                      <option value="$">AUD (Australian Dollar)</option>
                      <option value="$">SGD (Singapore Dollar)</option>
                      <option value="¥">CNY (Chinese Renminbi)</option>
                      <option value="₿">BTC (Bitcoin)</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>{this.state.currency}{this.state.subTotal}</span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small">({this.state.discountRate || 0}%)</span>
                      {this.state.currency}{this.state.discountAmmount || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small">({this.state.taxRate || 0}%)</span>
                      {this.state.currency}{this.state.taxAmmount || 0}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex flex-row align-items-start justify-content-between" style={{ fontSize: '1.125rem' }}>
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">{this.state.currency}{this.state.total || 0}</span>
                  </div>
                </Col>
                <Col lg={6}>
                    <PaymentButtons
                        invoiceNumber={this.state.invoiceNumber}
                        billTo={this.state.billTo}
                        billToEmail={this.state.billToEmail}
                        billToAddress={this.state.billToAddress}
                        items={this.state.items}
                        subTotal={this.state.subTotal}
                        taxAmount={this.state.taxAmmount}
                        discountAmount={this.state.discountAmmount}
                        total={this.state.total}
                        currency={this.state.currency}
                    />
                </Col>
              </Row>

              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control placeholder="Thank you for doing business with us!" name="notes" value={this.state.notes} onChange={(event) => this.editField(event)} as="textarea" className="my-2" rows={1} />
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button variant="primary" type="submit" className="d-block w-100" style={buttonStyle}>Review Invoice</Button>
              
              <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmmount={this.state.taxAmmount} discountAmmount={this.state.discountAmmount} total={this.state.total} />
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control name="taxRate" type="number" value={this.state.taxRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00" />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control name="discountRate" type="number" value={this.state.discountRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00" />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InvoiceForm;
