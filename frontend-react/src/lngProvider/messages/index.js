import { defineMessages } from "react-intl";


export const messages =  defineMessages({
  appFormUsername: {
    id: 'app.form.username',
    defaultMessage: 'User name'
  },
  appFormEmail: {
    id: 'app.form.email',
    defaultMessage: 'E-mail'
  },
  appFormPassword: {
    id: 'app.form.password',
    defaultMessage: 'Password'
  },
  appFormConfirmPassword: {
    id: 'app.form.confirmPassword',
    defaultMessage: 'Confirm Password'
  },
  appFormErrorEmptyUsername: {
    id: 'app.form.error.emptyUsername',
    defaultMessage: 'Please input your username'
  },
  appFormErrorInvalidEmail: {
    id: 'app.form.error.invalidEmail',
    defaultMessage: 'The input is not valid E-mail'
  },
  appFormEmptyPassword: {
    id: 'app.form.error.emptyPassword',
    defaultMessage: 'Please input your password'
  },
  appFormPasswordsInconsistent: {
    id: 'app.form.error.passwordsInconsistent',
    defaultMessage: 'Two passwords that you enter is inconsistent!'
  },
  appFormIAccept: {
    id: 'app.form.error.emptyPassword',
    defaultMessage: 'by signing up, I accept'
  },
  appFormTerms: {
    id: 'app.form.termAndCondition',
    defaultMessage: 'by signing up, I accept'
  },
  appFormRegisterSocial: {
    id: 'app.form.registerSocial',
    defaultMessage: 'or connect with'
  },
  signupErrorEmailTaken: {
    id: 'signup.error.emailTaken',
    defaultMessage: 'Email is taken'
  },
  signupErrorGeneral: {
    id: 'signup.error.general',
    defaultMessage: 'Signup failed, try again'
  },

  signinErrorEmailNotFound: {
    id: 'signin.error.emailNotFound',
    defaultMessage: 'Email not found. Register first'
  },
  signinErrorIncorrectPassword: {
    id: 'signin.error.incorrectPassword',
    defaultMessage: 'Your email and password combination does not match'
  },
  signinErrorGeneral: {
    id: 'signin.error.general',
    defaultMessage: 'Signin failed, try again'
  },
  activationSuccess: {
    id: 'activation.success',
    defaultMessage: 'Your account is active. Please, go to application'
  },
  activationError: {
    id: 'activation.error',
    defaultMessage: 'Activation failed'
  },
  activationWarningAccountActivatedBefore: {
    id: 'activation.warning.accountActivatedBefore',
    defaultMessage: 'Your account was activated before. Please sign in.'
  },
  activationErrorDescription: {
    id: 'activation.errorDescription',
    defaultMessage: 'The cause can be expired acivation link. Try send it again.'
  },

  activationConnectionError: {
    id: 'activation.connectionError',
    defaultMessage: 'Connection error. Try again.'
  },

  activationInputEmail: {
    id: 'activation.inputEmail',
    defaultMessage: 'Input email to send activation link'
  },
  activationEmailSent: {
    id: 'activation.emailSent',
    defaultMessage: 'Email was sent'
  },
  activationEmailSentDescription: {
    id: 'activation.emailSentDescription',
    defaultMessage: 'Check your email and click activation link'
  },


})
  