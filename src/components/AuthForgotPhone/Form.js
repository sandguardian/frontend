import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import PhoneField from 'components/Formik/PhoneField'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Config from 'react-native-config'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .trim()
    .required(),
})

const ForgotForm = ({
  t,
  theme,
  handleSubmit,
  loading,
  disabled,
  dirty,
  isValid,
  isValidating,
}) => {
  const styling = styles(theme)

  const submitDisabled = (
    disabled ||
    !isValid ||
    isValidating
  )

  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field testID="components/AuthSignin/Form/username" name="username" component={PhoneField} placeholder={t('Phone Number')} keyboardType="phone-pad" textContentType="telephoneNumber" autoCompleteType="tel" autoFocus />
      </View>
      <View style={styling.input}>
        <DefaultButton testID="components/AuthSignin/Form/submit" label={t('Next')} onPress={handleSubmit} loading={loading} disabled={submitDisabled} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  input: {
    marginBottom: 12,
  },
})

ForgotForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(({
  handleFormSubmit,
  handleFormTransform,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
  ...props
}) => (
  <Formik
    initialValues={formInitialValues}
    validationSchema={formSchema}
    onSubmit={handleFormSubmit}
    enableReinitialize
  >
    {(formikProps) => (
      <ForgotForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
        handleSubmit={() => {
          const nextValues = handleFormTransform(formikProps.values)
          formikProps.setValues(nextValues)
          handleFormSubmit(nextValues)
        }}
      />
    )}
  </Formik>
)))
