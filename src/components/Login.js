import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
// import * as Cookies from 'js-cookie'
import './component'
import { history } from 'components/handleFun'
import Api from 'api'
const FormItem = Form.Item
class Login extends React.Component {
  static propTypes={
    form:PropTypes.object
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          oprId:'admin',
          oprPwd:111111,
          platformId: '1000'
        }
        // Promise.resolve()
        // .then(() => console.log(obj))
        // .then(() => Api.getLoginInfo(obj))
        // .then(() => history.push('/'))
        Api.getLoginInfo(obj)
          .then(res=> {
            console.log(res)
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('platformId', res.data.platform)
            history.push('/')
          })
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login-container'>
        <div className='login-side'>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <FormItem>
              {getFieldDecorator('platformId', {
                rules: [{ required: true, message: '请输入平台号' }],
              })(
                <Input prefix={
                  <Icon type='laptop'
                        style={{ color: 'rgba(0,0,0,.25)' }}
                  />} placeholder='平台号' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('oprId', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input prefix={
                  <Icon type='user'
                    style={{ color: 'rgba(0,0,0,.25)' }}
               />} placeholder='用户名' />
          )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('oprPwd', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password' placeholder='密码'
              />
          )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
          )}
              <a className='login-form-forgot' href=''>忘记密码</a>
              <div />
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>

    )
  }
}

export default Form.create()(Login)
