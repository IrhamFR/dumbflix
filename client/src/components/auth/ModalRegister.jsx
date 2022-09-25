import React, { useState, useContext } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { API } from '../../config/api';


function ModalRegister({ handleClose, show }) {

  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(true)

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: 0,
    address: "",
  });

  // const {email, password, fullname, gender, phone, address} = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      if (isRegister) {
        const body = {
          email: form.email,
          password: form.password,
          fullname: form.fullname,
          gender: form.gender,
          phone: parseInt(form.phone),
          address: form.address,
        }
      
        if(form.email === "" || form.password === ""){
          const alert = (
            <Alert variant="danger" className="py-1">
              All Fields Is Required
            </Alert>
          );
          setMessage(alert)
          return;
        }

        // Insert data user to database
        const response = await API.post('/register', body, config);
        console.log(response)

        // Notification
        if (response.status === 200) {
          const alert = (
            <Alert variant="success" className="py-1">
              Register Success
            </Alert>
          );
          setMessage(alert);
          setForm({
            email: "",
            password: "",
            fullname: "",
            gender: "",
            phone: "",
            address: ""
          });
          e.target.reset()
          switchRegister()

        } else {
          const alert = (
            <Alert variant="danger" className="py-1">
              Register Failed
            </Alert>
          );
          setMessage(alert);
        }
      } else {
        // Data body
        const body = JSON.stringify(form);
        // Insert data user to database
        const response = await API.post('/login', body, config);
        console.log(response)

        // Notification
        if (response.data.code === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data
          })

          const alert = (
            <Alert variant="success" className="py-1">
              Login Success
            </Alert>
          );
          setMessage(alert);
          setForm({
            fullname: "",
            email: "",
            password: "",
          });
        } else {
          const alert = (
            <Alert variant="danger" className="py-1">
              Login Failed
            </Alert>
          );
          setMessage(alert);
        }
        if(response.data.data.role === "Admin") {
          navigate('/admin')
        }else {
          navigate('/')
        }
        handleClose()
      }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }

    // e.preventDefault()
    // handleClose()
    // if(isRegister) {
    //   localStorage.setItem("token", JSON.stringify(userData))
    // }
  });

  // const [userData, setUserData] = useState(form)

  const switchRegister = () => {
    // setForm(form)
    setIsRegister(!isRegister)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header className="bg-dark text-white border-0">
          <Modal.Title>{isRegister ? "Register" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                className="mb-3 bg-secondary text-white formModal"
                name="email"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3 bg-secondary text-white formModal"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            {isRegister ? (
              <>

                {/* Fullname */}
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="mb-3 bg-secondary text-white formModal"
                    name="fullname"
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Gender */}
                <Form.Select
                  type="text"
                  placeholder="Gender"
                  className="mb-3 bg-secondary text-white formModal"
                  name="gender"
                  onChange={handleChange}
                >
                  <option disabled selected>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>

                {/* Phone */}
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Control
                    type="number"
                    placeholder="Phone"
                    className="mb-3 bg-secondary text-white formModal"
                    name="phone"
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Address */}
                <Form.Group className="mb-3" controlId="address">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    className="mb-3 bg-secondary text-white formModal"
                    name="address"
                    onChange={handleChange}
                  />
                </Form.Group>
              </>) : ("")}

            <Button className="bg-white text-danger fw-bold border-0 btn-full" >
            <input type={"submit"} className="bg-white text-danger fw-bold border-0 btn-full" size="lg" value={isRegister ? "Register" : "Login"} />
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className='bg-dark border-0 mod-fot'>
          <p className='text-white text-muted'>Already Have an Account? Klik<span onClick={switchRegister} className='here'> Here</span></p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalRegister