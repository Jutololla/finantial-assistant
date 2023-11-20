import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from 'antd'
import './index.css';

const App: React.FC = () => {
  const [form] = Form.useForm()

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 900 }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`TDC ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                }
              >
                <Form.Item
                  label="Nombre"
                  name={[field.name, 'name']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Fecha de corte"
                  name={[field.name, 'cutDate']}
                >
                  <InputNumber
                    min={1}
                    max={28}
                  />
                </Form.Item>
                <Form.Item
                  label="Fecha de pago"
                  name={[field.name, 'payDate']}
                >
                  <InputNumber
                    min={1}
                    max={28}
                  />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="Compra">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 4,
                        }}
                      >
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                          <Col
                            className="gutter-row"
                            span={5}
                          >
                            Fecha
                          </Col>
                          <Col
                            className="gutter-row"
                            span={5}
                          >
                            Precio
                          </Col>
                          <Col
                            className="gutter-row"
                            span={5}
                          >
                            Interes
                          </Col>
                          <Col
                            className="gutter-row"
                            span={5}
                          >
                            Periodos
                          </Col>
                        </Row>
                        {subFields.map((subField) => (
                          <Row
                            gutter={{ xs: 8, sm: 16, md: 25, lg: 32 }}
                            key={subField.key}
                          >
                            <Col
                              className="gutter-row"
                              span={5}
                            >
                              <Form.Item
                                noStyle
                                name={[subField.name, 'date']}
                              >
                                <DatePicker placeholder="Fecha" />
                              </Form.Item>
                            </Col>
                            <Col
                              className="gutter-row"
                              span={5}
                            >
                              <Form.Item
                                noStyle
                                name={[subField.name, 'price']}
                              >
                                <InputNumber
                                  min={1}
                                  placeholder="Precio"
                                />
                              </Form.Item>
                            </Col>
                            <Col
                              className="gutter-row"
                              span={5}
                            >
                              <Form.Item
                                noStyle
                                name={[subField.name, 'interest']}
                              >
                                <InputNumber
                                  min={0}
                                  max={100}
                                  placeholder="Interes"
                                />
                              </Form.Item>
                            </Col>
                            <Col
                              className="gutter-row"
                              span={5}
                            >
                              <Form.Item
                                noStyle
                                name={[subField.name, 'nPeriods']}
                              >
                                <InputNumber
                                  min={1}
                                  placeholder="Periodos"
                                />
                              </Form.Item>
                            </Col>
                            <Col
                              className="gutter-row"
                              span={1}
                            >
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name)
                                }}
                              />
                            </Col>
                          </Row>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                          style={{ marginTop: 16 }}
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button
              type="dashed"
              onClick={() => add()}
              block
            >
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item
        noStyle
        shouldUpdate
      >
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  )
}

export default App
