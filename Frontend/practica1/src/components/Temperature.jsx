import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "wouter";
import React, { useState } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import XMLParser from 'react-xml-parser';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

export default function Temperature() {
    const [data, setData] = useState();
    const [number, setNumber] = useState();
    const [title, setTitle] = useState('Celsius To FahrenheitResult');

    const handleChange = (event) => {
        setNumber(event.target.value);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function CelsiusToFahrenheit() {
        const xmlData = `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
          <soap12:Body>
            <CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
              <Celsius>${number}</Celsius>
            </CelsiusToFahrenheit>
          </soap12:Body>
        </soap12:Envelope>`;

        try {
            const response = await axios.post(
                'https://www.w3schools.com/xml/tempconvert.asmx',
                xmlData,
                {
                    mode: "cors",
                    headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' },
                }
            );
            console.log(response.data); // Maneja la respuesta SOAP aquí
            var xml = new XMLParser().parseFromString(response.data);    // Assume xmlText contains the example XML
            console.log(xml);
            console.log(xml.getElementsByTagName('CelsiusToFahrenheitResult'));
            setData(xml.getElementsByTagName('CelsiusToFahrenheitResult'));
            console.log(data)
            setTitle("Celsius To Fahrenheit Result:")
            handleShow();
        } catch (error) {
            console.error(error); // Maneja el error de la solicitud SOAP
        }
    }


    async function FahrenheitToCelsius() {
        const xmlData = `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
          <soap12:Body>
            <FahrenheitToCelsius xmlns="https://www.w3schools.com/xml/">
              <Fahrenheit>${number}</Fahrenheit>
            </FahrenheitToCelsius>
          </soap12:Body>
        </soap12:Envelope>`;

        try {
            const response = await axios.post(
                'https://www.w3schools.com/xml/tempconvert.asmx',
                xmlData,
                {
                    mode: "cors",
                    headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' },
                }
            );
            console.log(response.data); // Maneja la respuesta SOAP aquí
            var xml = new XMLParser().parseFromString(response.data);    // Assume xmlText contains the example XML
            console.log(xml);
            console.log(xml.getElementsByTagName('FahrenheitToCelsiusResult'));
            setData(xml.getElementsByTagName('FahrenheitToCelsiusResult'));
            console.log(data)
            setTitle("Fahrenheit To Celsius Result:")
            handleShow();
        } catch (error) {
            console.error(error); // Maneja el error de la solicitud SOAP
        }
    }

    return (
        <>
            <center>
                <h2><Badge bg="info">SOAP API Convert Temperature</Badge></h2>
                <br></br>
                <Form.Control size="sm" type="text" placeholder="Number" onChange={handleChange} />
                <br></br>
                <Button variant="info" onClick={CelsiusToFahrenheit}>
                    Celsius to Farenheit Conversion
                </Button>
                <Button variant="info" onClick={FahrenheitToCelsius}>
                    Farenheit to Celsius Conversion
                </Button>
            </center>

            <Alert show={show} variant="info">
                <Alert.Heading>{title}</Alert.Heading>
                <h2><Badge bg="info">{data?data[0].value:null}</Badge></h2>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-info">
                        Close
                    </Button>
                </div>
            </Alert>
        </>
    );
}