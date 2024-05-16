import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useIntl } from "gatsby-plugin-intl-v4";
import { Script } from "gatsby";

const MailForm = ({ Styles }) => {
  const t = useIntl().formatMessage;
  const dfltStatus = { status: `notsubmitted`, msg: `` };
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
      <Formik
        initialStatus={dfltStatus}
        initialValues={{ phone: "", email: "", myname: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = t({ id: `contacts.required_err_msg` });
          } else if (
            !/^[\d]{10,15}$/i.test(values.phone.replace(/[^\d]/g, ""))
          ) {
            errors.phone = t({ id: `contacts.required_err_msg_phone` });
          }
          if (!values.email) {
            errors.email = t({ id: `contacts.required_err_msg` });
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = t({ id: `contacts.required_err_msg_email` });
          }
          if (!values.myname) {
            errors.myname = t({ id: `contacts.required_err_msg` });
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setStatus(dfltStatus);
          var form = document.querySelector("form#contactform");
          var formData = new FormData(form);
          for (var [key, value] of formData.entries()) {
            if (key === `phone`)
              formData.set(`phone`, value.replace(/[^\d]/g, ""));
          }
          fetch(`${process.env.GATSBY_FORM_URL}`, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject({
                status: `error`,
                msg: t({ id: `contacts.mailerr` }),
              });
            })
            .then((response) => {
              setSubmitting(false);
              setStatus({
                status: `ok`,
                msg: t({ id: `contacts.mailsended` }),
              });
            })
            .catch((obj) => {
              setSubmitting(false);
              setStatus(obj);
            });
        }}
      >
        {({ isSubmitting, status }) =>
          status && status.status === `ok` ? (
            <div className={Styles.sendeddiv}>{status.msg}</div>
          ) : (
            <>
              <Form className={Styles.form} id={`contactform`}>
                <div>
                  <Field
                    placeholder={t({ id: `contacts.form_name` })}
                    className={Styles.myname}
                    type={`text`}
                    name={`myname`}
                  />
                  <ErrorMessage
                    name={`myname`}
                    className={Styles.fielderr}
                    component={`div`}
                  />
                </div>
                <div>
                  <Field
                    placeholder={t({ id: `contacts.email` })}
                    className={Styles.email}
                    type={`email`}
                    name={`email`}
                  />
                  <ErrorMessage
                    name={`email`}
                    className={Styles.fielderr}
                    component={`div`}
                  />
                </div>
                <div>
                  <Field
                    placeholder={t({ id: `contacts.phone` })}
                    className={Styles.phone}
                    type={`phone`}
                    name={`phone`}
                  />
                  <ErrorMessage
                    name={`phone`}
                    className={Styles.fielderr}
                    component={`div`}
                  />
                </div>
                <div
                  className="cf-turnstile"
                  data-sitekey={`${process.env.GATSBY_TURNSTILE_KEY}`}
                ></div>
                <div>
                  <button
                    className={`${Styles.button} ${
                      isSubmitting ? Styles.butloading : ``
                    }`}
                    type={`submit`}
                  >
                    {t({ id: `contacts.submit` })}
                  </button>
                </div>
                <div className={Styles.ps}>
                  {t(
                    { id: `contacts.privacypolicy` },
                    {
                      link: (
                        <a
                          href={`/privacy-policy`}
                          target={`_blank`}
                          className={Styles.policylink}
                        >
                          {t({ id: `contacts.privacypolicylabel` })}
                        </a>
                      ),
                    }
                  )}
                </div>
              </Form>
              {status.status === `error` ? (
                <div className={Styles.errmsg}>{status.msg}</div>
              ) : (
                <></>
              )}
            </>
          )
        }
      </Formik>
    </>
  );
};

export default MailForm;
