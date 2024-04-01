"use client";
import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import FormikField from "@/components/FormikField";
import FormikSelect from "@/components/FormikSelect";
import { DEPARMENTS, MUNICIPIOS, DOCUMENTS } from "../../utils/const";
import { createCredit } from "@/actions/credit";
import ImageUpload from "@/components/ImageUpload";
import * as Yup from "yup";
import TakePhoto from "@/components/TakePhoto";
import { compareImages } from "@/actions/faceDetection";

export default function CreateCredit() {
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("El nombre es requerido"),
    last_name: Yup.string().trim().required("El apellido es requerido"),
    email: Yup.string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es requerido"),
    phone: Yup.string()
      .matches(
        /^\d{4}-\d{4}$/,
        'El número de teléfono debe tener el formato númerico "xxxx-xxxx"'
      )
      .required("El número de teléfono es requerido"),
    identification: Yup.string().required(
      "El tipo de identificación es requerido"
    ),
    dui: Yup.string().matches(
      /^\d{8}-\d$/,
      'El formato del dui debe ser "XXXXXXXX-X"'
    ),
    nit: Yup.string().matches(
      /^\d{4}-\d{6}-\d{3}-\d$/,
      'El formato del nit debe ser "XXXX-XXXXXX-XXX-X"'
    ),
    department: Yup.string().required("El departamento es requerido"),
    municipio: Yup.string().required("El municipio es requerido"),
    direction: Yup.string().notRequired(),
    document: Yup.mixed(),
    selpie: Yup.mixed(),
    income: Yup.number()
      .required("El ingreso es requerido")
      .positive("El ingreso debe ser un número positivo"),
  });

  const sendData = async (values: any) => {
    const compare = await compareImages(values.document, values.selfie);
    if (compare) {
      const { status } = await createCredit(values);
      if (status === "success") {
        return toast({
          title: "Aviso",
          description: "Se guardo el credito",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } else if (compare === false) {
      return toast({
        title: "Aviso",
        description: "Al parecer no coincide la persona con el documento",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    return toast({
      title: "Aviso",
      description: "Occurio un error al guardar los datos",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className="w-screen h-screen">
      <div className="grid md:grid-cols-6 gap-4">
        <div className="max-md:hidden" />
        <div className="col-span-6 md:col-span-4 my-10 mx-7 md:my-10 md:mx-5">
          <section className="rounded-xl overflow-hidden shadow-lg bg-white p-5">
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                identification: "",
                dui: "",
                nit: "",
                identification_number: "",
                department: "",
                municipio: "",
                direction: "",
                document: "",
                selfie: "",
                income: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => sendData(values)}
            >
              {({ values, errors, touched }) => (
                <Form encType="multipart/form-data">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormikField
                      name="first_name"
                      label="Nombres"
                      error={touched.first_name ? errors.first_name ?? "" : ""}
                      isRequired
                    />
                    <FormikField
                      name="last_name"
                      label="Apellidos"
                      error={touched.last_name ? errors.last_name ?? "" : ""}
                      isRequired
                    />
                    <FormikField
                      name="email"
                      label="Email"
                      error={touched.email ? errors.email ?? "" : ""}
                      type="email"
                      isRequired
                    />
                    <FormikField
                      name="phone"
                      label="Teléfono"
                      error={touched.phone ? errors.phone ?? "" : ""}
                      type="tel"
                      isRequired
                    />
                    <FormikSelect
                      name="identification"
                      label="Tipo de identificación"
                      options={DOCUMENTS}
                      error={
                        touched.identification
                          ? errors.identification ?? ""
                          : ""
                      }
                      isRequired
                    />
                    {values.identification !== "" &&
                    values.identification === "dui" ? (
                      <FormikField
                        name="dui"
                        label={"Dui"}
                        error={touched.dui ? errors.dui ?? "" : ""}
                      />
                    ) : null}
                    {values.identification !== "" &&
                    values.identification === "nit" ? (
                      <FormikField
                        name="nit"
                        label={"Nit"}
                        error={touched.nit ? errors.nit ?? "" : ""}
                      />
                    ) : null}
                    <FormikSelect
                      name="department"
                      label="Departamento"
                      options={DEPARMENTS}
                      error=""
                      isRequired
                    />
                    <FormikSelect
                      name="municipio"
                      label="Municipio"
                      options={MUNICIPIOS}
                      error={touched.department ? errors.department ?? "" : ""}
                      isRequired
                    />
                    <FormikField name="direction" label="Dirección" error="" />
                    <FormikField
                      name="income"
                      label="Ingresos mensuales"
                      error={touched.income ? errors.income ?? "" : ""}
                      isRequired
                    />
                    <ImageUpload />
                    <TakePhoto />
                    <Button
                      gridColumn="span 2"
                      mt={4}
                      colorScheme="teal"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </div>
        <div className="max-md:hidden" />
      </div>
    </div>
  );
}
