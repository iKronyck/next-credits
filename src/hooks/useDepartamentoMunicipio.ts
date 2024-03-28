import { useEffect, useState } from "react";
import { ApiService } from "utils/api";

interface Municipios {
  nombre: string;
}

interface Departamentos {
  nombre: string;
  municipios: Municipios[];
}

export default function useDepartamentoMunicipio(department: string) {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const getData = async () => {
    const response = await ApiService.getDepartments<Departamentos[]>({
      url: "departamentos",
    });
    console.log({ response });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [department]);

  return {
    departamentos,
    municipios,
  };
}
