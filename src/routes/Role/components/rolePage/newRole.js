import React from 'react'
import {
  Form, Input, Select, Button, AutoComplete, Dropdown, Menu, Icon, message
} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history, formatDate } from 'fun'
import Api from 'api'

const { Option } = Select;
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
        console.log(values)
        const updateObj = {
          descr: values.descr,
          platformId: parseInt(values.platformId),
          roleList: '100000',
          roleName: values.roleName,
          roleType: parseInt(values.roleType)
        }
        Api.newRole(updateObj)
          .then(res => {
            console.log(res)
            window.closeNewRole()
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state
    const Option = Select.Option

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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

    return (
      <React.Fragment>
        <div style={{ width:'60%', margin:'10px auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label='角色名称'
            >
              {getFieldDecorator('roleName', {
                rules: [{
                  required: true,
                  message: '请输入正确的角色名称!',
                }, {
                  max: 32,
                  message: '最多32个字符'
                }, {
                  min: 2,
                  message: '最少2个字符'
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='平台ID'
            >
              {getFieldDecorator('platformId', {
                rules: [{
                  required: true,
                  length: 4,
                  message: '请输入正确的平台ID!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='角色分类'
            >
              {getFieldDecorator('roleType', {
                rules: [{
                  required: true,
                  message: '请输入正确的平台简介!',
                }],
              })(
                <Select style={{ width: 200 }}>
                  <Option value='1'>ClearMarkets管理员</Option>
                  <Option value='2'>ClearMarkets操作员</Option>
                  <Option value='3'>平台管理员</Option>
                  <Option value='4'>平台操作员</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='角色简介'
            >
              {getFieldDecorator('descr', {
                rules: [{
                  required: true,
                  message: '请输入正确的角色简介!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' style={{ width: '50%' }} htmlType='submit'>增加角色</Button>
            </Form.Item>
          </Form>
        </div>

      </React.Fragment>

    )
  }
}

export default Form.create({ name: 'register' })(RegistrationForm);
