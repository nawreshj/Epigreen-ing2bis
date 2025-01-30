import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../styles/Sample.css';
import { GET_SAMPLES, LOCAL_HOST_SAMPLE, UPDATE_SAMPLES, ADD_SAMPLES } from "../constants/back";

export default function Sample() {
  const [samples, setSamples] = useState([]);
  const [newSample, setNewSample] = useState({
    dateSample: '',
    stringSample: '',
    floatSample: '',
    sampleType: 'SAMPLE_TYPE1' // Exemple de valeur par défaut

  });
  const [isAdding, setIsAdding] = useState(false);

  const setSampleData = async () => {
    axios.get(GET_SAMPLES).then((response) => {
      setSamples(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  const confirmRemoveSample = (id) => {
    if (window.confirm('Are you sure?')) {
      removeSample(id);
    }
  };

  const removeSample = async (id) => {
    axios.delete(LOCAL_HOST_SAMPLE + id).then((response) => {
      setSampleData();
    }).catch(error => {
      alert("Error Ocurred in removeSample:" + error);
    });
  }

  const handleChangeDate = (idSample, newDate) => {
    setSamples(prevData => prevData.map(
      row => row.idSample === idSample ? { ...row, dateSample: newDate } : row)
    );
  }

  const updateDate = async (sample) => {
    axios.post(UPDATE_SAMPLES, sample).then((response) => {
      setSampleData();
    }).catch(error => {
      alert("Error Ocurred in updateDate:" + error);
    });
  }

  const addSample = async () => {
    axios.post(ADD_SAMPLES, newSample).then(() => {
      setSampleData();
      setIsAdding(false);  // Cacher le formulaire après l'ajout
    }).catch(error => {
      alert("Error occurred while adding sample: " + error);
    });
  };

  useEffect(() => {
    setSampleData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSample(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (samples.length === 0)
    return (<div className="container text-center">No samples</div>);

  return (
    <div className="container text-center">

      <h4 className="mx-2">Samples List</h4>

      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => setIsAdding(true)}
      >
        Add a Sample
      </button>

      {isAdding && (
        <div className="form-container mb-4">
          <h5>Add New Sample</h5>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="dateSample"
              value={newSample.dateSample}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>String:</label>
            <input
              type="text"
              name="stringSample"
              value={newSample.stringSample}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Float:</label>
            <input
              type="number"
              name="floatSample"
              value={newSample.floatSample}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Sample Type:</label>
            <select
              name="sampleType"
              value={newSample.sampleType}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="SAMPLE_TYPE1">SAMPLE_TYPE1</option>
              <option value="SAMPLE_TYPE2">SAMPLE_TYPE2</option>
            </select>
          </div>
          <button className="btn btn-outline-success mt-2" onClick={addSample}>Save</button>
          <button className="btn btn-outline-secondary mt-2" onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}

      <div className="row">
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">String</th>
              <th scope="col">Float</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              samples.map((sample, index) => (
                <tr key={index}>
                  <th scope="row">{sample.idSample}</th>
                  <td>
                    <div className="input-group mb-3">
                      <input type="date"
                             className="form-control"
                             aria-describedby="button-addon2"
                             value={sample.dateSample.substring(0, 10)}
                             onChange={e => handleChangeDate(sample.idSample, e.target.value)}
                      />
                      <button className="btn btn-outline-primary"
                              type="button"
                              id="button-addon2"
                              onClick={() => updateDate(sample)}
                      >Save</button>
                    </div>
                  </td>
                  <td>{sample.stringSample}</td>
                  <td>{sample.floatSample}</td>
                  <td>{sample.sampleType}</td>
                  <td>
                    <button type="button"
                            className="btn btn-outline-danger"
                            onClick={() => confirmRemoveSample(sample.idSample)}
                    >Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
