import React from 'react'
import {
  Form, Input, Select, Button, AutoComplete,
} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history, formatDate } from 'fun'
import Api from 'api'
import * as sha256 from "sha256";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    roleList: [],
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        const updateObj = {
          oprDsc: values.oprDsc,
          oprId: values.oprId,
          oprPwd: sha256(values.oprPwd),
          platformId: values.platformId,
          roleId: values.roleId
        }
        console.log(updateObj)
        Api.newOperator(updateObj)
          .then(res => {
            window.queryOperator()
            window.closeNewOperator()
          })
      }
    })
  }
  handlePlatChoose = (val) => {
    Api.updateRoleList(val)
      .then(res => {
        this.setState({
          roleList: res.data
        })
      })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { platList } = this.props
    const { autoCompleteResult , roleList = []} = this.state

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
              label='用户名'
            >
              {getFieldDecorator('oprId', {
                rules: [{
                  required: true,
                  message: '请输入合适的用户名!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='密码'
            >
              {getFieldDecorator('oprPwd', {
                rules: [{
                  required: true,
                  message: '请输入合适的密码!',
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
                  message: '请输入平台ID!',
                }],
              })(
                <Select style={{ width: 200 }} onChange={this.handlePlatChoose}>
                  {
                    platList.map(val => <Option value={val.platformId} key={val.platformId}>{val.platformId + '-' +
                      val.rename}</Option>
                    )
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='角色选择'
            >
              {getFieldDecorator('roleId', {
                rules: [{
                  required: true,
                  message: '请输入正确的平台简称!',
                }],
              })(
                <Select style={{ width: 200 }}>
                  {
                    roleList.map(val => <Option value={val.roleId} key={val.roleId}>{val.roleName}</Option>
                    )
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='管理员简介'
            >
              {getFieldDecorator('oprDsc', {
                rules: [{
                  required: true,
                  message: '请输入管理员简介!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' style={{ width: '50%' }} htmlType='submit'>更新信息</Button>
            </Form.Item>
          </Form>
        </div>

      </React.Fragment>

    )
  }
}

export default Form.create({ name: 'register' })(RegistrationForm);
