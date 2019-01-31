import React from 'react'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history, formatDate } from 'fun'
import Api from 'api'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const updateObj = {
          assets: values.assets,
          platformId: sessionStorage.getItem('updatePlatId')
        }
        Api.updateAssets(updateObj)
          .then(res => {
            console.log(res)
            window.closeModal()
            window.assetsReq()
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    )

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ))

    return (
      <React.Fragment>
        <div style={{ width:'60%', margin:'10px auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label='现有资产'
            >
              {getFieldDecorator('assets', {
                rules: [{
                  required: true,
                  message: '请输入正确资产!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' style={{ width: '50%' }} htmlType='submit'>Register</Button>
            </Form.Item>
          </Form>
        </div>

      </React.Fragment>

    )
  }
}

export default Form.create({ name: 'register' })(RegistrationForm)
