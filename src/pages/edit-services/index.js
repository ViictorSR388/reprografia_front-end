import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/edit-services.scss';
import LoginContainer from '../../components/loginContainer';
import Loading from '../../../src/components/loading';

export default function AddService() {

  var history = useHistory();

  var { type, id } = useParams();

  const port = process.env.REACT_APP_PORT || 3002;
  
  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [message, setMessage] = useState();

  const EditService = () => {
    const data = {
      descricao: descricao,
      quantidade: quantidade,
      valor_unitario: custo,
    }
    axios.put(`${reprografia_url}/service/${id}/type=${type}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      console.log(result);
      if (result.data.status === "error") {
        setMessage(result.data.message)
      }
      else {
        setMessage(result.data.message)
        setTimeout(() => {
          history.push("/services")
        }, 150);
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    EditService()
  }

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${reprografia_url}/service/${id}/type=${type}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setDescricao(result.data.descricao)
        setQuantidade(result.data.quantidade)
        setCusto(result.data.valor_unitario)
        setLoading(false);
      });
  }, [id, type, reprografia_url]);


  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <LoginContainer />
          <div className="finishing">
            <form onSubmit={onSubmit}>
              <h2 id="h2" className="service-subTitle">
                Editar Serviço
              </h2>
              <h2 className="title-editService">{descricao}</h2>
              <input
                className="input-service-ED"
                name="quantidade"
                type="number"
                placeholder={quantidade}
                onChange={(e) => {
                  setQuantidade(e.target.value);
                }}
              />
              <input
                className="input-service-EDS"
                name="custo"
                type="number"
                step="any"
                placeholder={custo}
                onChange={(e) => {
                  setCusto(e.target.value);
                }}
              />
              <h3>{message}</h3>
              <div className="btns-edit-services">
                <input
                  type="submit"
                  className="nu-send-button"
                  id="btn"
                  value="Editar"
                />
                <button
                  className="btn-back-user"
                  id="btn"
                  onClick={() => history.push("/services")}>Voltar
                </button>
              </div>
            </form>
          </div>
        </>
      }
    </>
  );
}