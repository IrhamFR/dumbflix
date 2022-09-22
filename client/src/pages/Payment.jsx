import { React, useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import {RiAttachmentFill} from 'react-icons/ri'

function Payment() {
  let Navigate = useNavigate();
  let { data: profile, refetch: profileRefetch } = useQuery(
    "profileCache",
    async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };
      const response = await API.get("/check-auth", config);
      return response.data.data;
    }
  );

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-igdkPxs9-3ed9LrR";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    e.preventDefault()
    try {
      const data = {
        userId: profile?.ID,
      };

      const body = JSON.stringify(data);

      const config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await API.post("/transaction", config);
      console.log("ini transaction", response);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) { }
  });
  const title = "Be Premium";
  document.title = "Dumbflix | " + title;

  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);

  const onChangeFiles = (e) => {
    let fileInfo = e.target.files[0];
    setFile(fileInfo);
    let reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }

    reader.onloadend = (e) => {
      setPreviewSrc([reader.result]);
    };

    reader.readAsDataURL(fileInfo);
  };

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  return (
    <div className="container-fluid sectionPayment">
      <div className="text-center text-light">
        <h1 className="fs-2 fw-bold mb-5">Premium</h1>
        <p className="pPayment">
          Bayar Sekarang dan nikmati streaming film-film yang kekinian dari{" "}
          <span className="text-danger fw-bold">DUMBFLIX</span>
        </p>

        <div>
          <p className="text-danger fw-bold">
            DUMBFLIX <span className="text-light">: -</span>{" "}
          </p>
        </div>

        <Form style={{width:"60%", margin: "20px auto"}}>
          <Form.Group className="mb-3" controlId="accountNumber">
            <Form.Control type="number" placeholder="Input your account number" className="border border-light border-3 formPayment"/>
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Button type="button" onClick={() => onBtnClick()} className="labelInputFile rounded">Attach proof of transfer <span><RiAttachmentFill style={{fontSize: "30px"}}/></span></Button>
            <Form.Control onChange={(e) => onChangeFiles(e)}
                type="file"
                name="file"
                ref={inputFileRef}
                style={{ display: "none" }} 
                placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={(e) => handleBuy.mutate(e)}
                className="btnsub border-0 btnSubmitPayment py-2 fw-bold">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Payment;
