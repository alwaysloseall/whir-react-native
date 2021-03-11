import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import { createForm } from 'rc-form'
import { useDispatch } from 'react-redux'
import { TouchFix } from '@whir-react-native/components'
import Header from '@/components/Header'
import { fixStyleSheet, toast } from '@whir-react-native/utils'

export default createForm()(({ form, navigation }) => {
  const dispatch = useDispatch()
  const [showPsw, setShowPsw] = useState(false)

  const handleSubmit = () => {
    Keyboard.dismiss()

    form.validateFields(async (errors, values) => {
      if (errors) {
        toast.fail(errors[Object.keys(errors)[0]].errors[0].message)
      }
      if (!errors) {
        await dispatch({
          type: 'auth/signin',
          payload: values,
        })
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabbar', screen: 'Home1' }],
        })
      }
    })
  }
  const togglePwdDispaly = state => {
    setShowPsw(state)
  }
  const { getFieldProps, setFieldsValue } = form
  const inputProps = {
    enablesReturnKeyAutomatically: true,
    underlineColorAndroid: 'transparent',
    clearButtonMode: 'always',
    returnKeyType: 'done',
    style: styles.textInput,
    placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
  }

  return (
    <>
      <Header title="登录" backBtn={null} />
      <ImageBackground
        style={styles.imgBackground}
        source={require('@/assets/image/login_bg.png')}
        resizeMethod={'scale'}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.wingBlank}>
            <View style={styles.inputContainer}>
              <View style={[styles.listInput, styles.inputBottomBorder]}>
                <Image source={require('@/assets/image/ic_80login_user.png')} />
                <TextInput
                  {...getFieldProps('account', {
                    initialValue: __DEV__ ? 'admin' : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入账号',
                      },
                    ],
                  })}
                  {...inputProps}
                  onChangeText={value => {
                    setFieldsValue({ account: value })
                  }}
                  placeholder="请输入账号"
                />
              </View>
              <View style={styles.listInput}>
                <Image source={require('@/assets/image/ic_80login_pwd.png')} />
                <TextInput
                  {...getFieldProps('password', {
                    initialValue: __DEV__ ? '123456' : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })}
                  {...inputProps}
                  onChangeText={value => {
                    setFieldsValue({ password: value })
                  }}
                  secureTextEntry={!showPsw}
                  placeholder="请输入密码"
                />
                {showPsw ? (
                  <TouchableOpacity
                    onPress={() => {
                      togglePwdDispaly(false)
                    }}
                    style={styles.toggleButtom}>
                    <Image
                      source={require('@/assets/image/ic_80login_close.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      togglePwdDispaly(true)
                    }}
                    style={styles.toggleButtom}>
                    <Image
                      source={require('@/assets/image/ic_80login_check.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchFix onPress={handleSubmit} style={styles.loginButtom}>
              <Text style={styles.loginButtomText}>登录</Text>
            </TouchFix>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  )
})

const styles = fixStyleSheet({
  imgBackground: {
    flex: 1,
  },
  wingBlank: {
    paddingHorizontal: 80,
  },
  inputContainer: {
    marginTop: 160,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  listInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 120,
    paddingLeft: 12,
  },
  inputBottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textInput: {
    flex: 1,
    fontSize: 36,
    paddingLeft: 24,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  toggleButtom: {
    padding: 20,
  },
  loginButtom: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    height: 110,
    marginTop: 96,
  },
  loginButtomText: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
  },
})
