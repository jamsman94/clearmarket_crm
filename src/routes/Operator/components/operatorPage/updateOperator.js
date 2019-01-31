import React from 'react'
import {
  Form, Input, Select, Button, AutoComplete,
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
        if (this.props.passOrUpdate){
          const updateObj = {
            oprDsc: values.oprDsc,
            oprId: values.oprId,
            oprPwd: this.props.accountInfo.oprPwd,
            platformId:values.platformId,
            roleId: values.roleId
          }
          Api.updateOperator(updateObj)
            .then(res => {
              window.queryOperator()
              window.closeOperatorInfoChange()
            })
        } else {
          const updateObj = {
            platformId: values.platformId,
            oprId: values.oprId,
            oldPwd: values.oldPwd,
            newPwd: values.newPwd
          }
          Api.changePwd(updateObj)
            .then(res => {
              window.queryOperator()
              window.closeOperatorPassChange()
            })
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { passOrUpdate, roleList, accountInfo } = this.props
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
              label='操作员账号'
            >
              {getFieldDecorator('oprId', {
                rules: [{
                  required: true,
                  message: '请输入正确的平台简称!',
                }],
                initialValue: accountInfo.oprId
              })(
                <Input disabled={true} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='平台ID'
            >
              {getFieldDecorator('platformId', {
                rules: [{
                  required: true,
                  message: '请输入正确的平台简称!',
                }],
                initialValue: accountInfo.platformId
              })(
                <Input disabled={true} />
              )}
            </Form.Item>
            {
              passOrUpdate && <Form.Item
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
            }
            {
              passOrUpdate && <Form.Item
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
            }
            {
              !passOrUpdate && <Form.Item
                {...formItemLayout}
                label='旧密码'
              >
                {getFieldDecorator('oldPwd', {
                  rules: [{
                    required: true,
                    message: '请输入正确的密码格式!',
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
            }
            {
              !passOrUpdate && <Form.Item
                {...formItemLayout}
                label='新密码'
              >
                {getFieldDecorator('newPwd', {
                  rules: [{
                    required: true,
                    message: '请输入正确的密码格式!',
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
            }
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
