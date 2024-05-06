import * as React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useIntl } from "gatsby-plugin-intl"

const MailForm = ({ Styles }) => {
  const t = useIntl().formatMessage;
  const dfltStatus = { status: `notsubmitted`, msg: `` }
  return (<>
    <Formik
      initialStatus={dfltStatus}
      initialValues={{ phone: '', email: '', myname: '' }}
      validate={values => {
        const errors = {};
        if (!values.phone) {
          errors.phone = t({ id: `contacts.required_err_msg` });
        } else if (!/^[\d]{10,15}$/i.test(values.phone.replace(/[^\d]/g, ''))) {
          errors.phone = t({ id: `contacts.required_err_msg_phone` });
        }
        if (!values.email) {
          errors.email = t({ id: `contacts.required_err_msg` });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = t({ id: `contacts.required_err_msg_email` });
        }
        if (!values.myname) {
          errors.myname = t({ id: `contacts.required_err_msg` });
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        setStatus(dfltStatus)
        let formData = new FormData()
        formData.append(`phone`, values.phone.replace(/[^\d]/g, ''))
        formData.append(`email`, values.email)
        formData.append(`myname`, values.myname)
        fetch("/form.php", {
          method: "POST",
          body: formData
        }).then((response) => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject({ status: `error`, msg: t({ id: `contacts.mailerr` }) })
        })
          .then(response => {
            setSubmitting(false);
            setStatus(response);
          })
          .catch((obj) => {
            setSubmitting(false);
            setStatus(obj);
          });
      }}
    >
      {({ isSubmitting, status }) => ((status && status.status === `ok`) ?
        <div className={Styles.sendeddiv}>{status.msg}</div> : <>
          <Form className={Styles.form}>
            <div>
              <Field placeholder={t({ id: `contacts.form_name` })} className={Styles.myname} type={`text`} name={`myname`} />
              <ErrorMessage name={`myname`} className={Styles.fielderr} component={`div`} />
            </div>
            <div>
              <Field placeholder={t({ id: `contacts.email` })} className={Styles.email} type={`email`} name={`email`} />
              <ErrorMessage name={`email`} className={Styles.fielderr} component={`div`} />
            </div>
            <div>
              <Field placeholder={t({ id: `contacts.phone` })} className={Styles.phone} type={`phone`} name={`phone`} />
              <ErrorMessage name={`phone`} className={Styles.fielderr} component={`div`} />
            </div>
            <div>
              <button className={`${Styles.button} ${isSubmitting ? Styles.butloading : ``}`} type={`submit`}>
                {t({ id: `submit` })}
              </button>
            </div>
            <div className={Styles.ps}>
              {t({ id: `contacts.privacypolicy` }, {
                link: <a href={`/privacy-policy`} target={`_blank`} className={Styles.policylink}>{t({ id: `contacts.privacypolicylabel` })}</a>
              })}
            </div>
          </Form>
          {(status.status === `error`) ? <div className={Styles.errmsg}>{status.msg}</div> : <></>}
        </>)}
    </Formik>
  </>
  )
}

export default MailForm
