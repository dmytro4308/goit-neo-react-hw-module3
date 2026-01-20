import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId } from "react";
import styles from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    onAdd({
      id: nanoid(),
      ...values,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={styles.form}>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor={nameFieldId}>Name</label>
          <Field 
            className={styles.input} 
            type="text" 
            name="name" 
            id={nameFieldId} 
          />
          <ErrorMessage name="name" component="span" className={styles.error} />
        </div>

        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor={numberFieldId}>Number</label>
          <Field 
            className={styles.input} 
            type="text" 
            name="number" 
            id={numberFieldId} 
          />
          <ErrorMessage name="number" component="span" className={styles.error} />
        </div>

        <button className={styles.btn} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;