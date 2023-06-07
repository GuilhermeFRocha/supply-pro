import { Navbar } from "../components/Navbar";
import { Container } from "../styles/home";
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import { MyContext } from "../Context/MyContext";
import {
  ButtonSupplier,
  CardFormSupplier,
  ContainerSupplier,
  ContentSupplier,
  ProductSupplier,
} from "../styles/supplier";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  cnpj: Yup.string().required("Campo obrigatório"),
  cep: Yup.string().required("Campo obrigatório"),
  street: Yup.string().required("Campo obrigatório"),
  state: Yup.string().required("Campo obrigatório"),
  city: Yup.string().required("Campo obrigatório"),
});

export const Supplier = () => {
  const { productList, FornList, setFornList } = useContext(MyContext);

  const initialValues = {
    nome: "",
    cnpj: "",
    cep: "",
    street: "",
    state: "",
    city: "",
    products: [],
  };

  const handleSubmit = (values: any) => {
    const selectedProducts = values.products.map((productId: string) => {
      const product = productList.find((p) => p.id === productId);
      return {
        id: productId,
        productName: product.productName,
        description: product.description,
        photo: product.photo,
      };
    });

    const updatedValues = { ...values, products: selectedProducts };
    setFornList([...FornList, updatedValues]);
  };

  return (
    <Container>
      <Navbar />

      <CardFormSupplier>
        <h2>Cadastrar Fornecedor</h2>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ContentSupplier>
              <div>
                <label htmlFor="nome">Nome</label>
                <Field type="text" id="nome" name="nome" />
              </div>
              <div>
                <label htmlFor="cnpj">CNPJ</label>
                <Field type="text" id="cnpj" name="cnpj" />
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <Field type="text" id="cep" name="cep" />
              </div>
              <div>
                <label htmlFor="street">Rua</label>
                <Field type="text" id="street" name="street" />
              </div>
              <div>
                <label htmlFor="state">Estado</label>
                <Field type="text" id="state" name="state" />
              </div>
              <div>
                <label htmlFor="city">Cidade</label>
                <Field type="text" id="city" name="city" />
              </div>
            </ContentSupplier>
            <ContainerSupplier>
              <h3 className="titleSupplier">Adicionar Produtos</h3>

              <ProductSupplier>
                {productList.map((product) => (
                  <div key={product.id} className="productSupplier">
                    <h3>{product.productName}</h3>
                    <img src={product.photo} alt="" />
                    <p>{product.description}</p>
                    <div style={{ border: "none" }}>
                      <Field
                        type="checkbox"
                        id={product.id}
                        name="products"
                        value={product.id}
                      />
                      <label htmlFor={product.productId}>Selecionar</label>
                    </div>
                  </div>
                ))}
              </ProductSupplier>
            </ContainerSupplier>
            <ButtonSupplier type="submit">Enviar</ButtonSupplier>
          </Form>
        </Formik>
      </CardFormSupplier>
    </Container>
  );
};
